using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public record GetMessagesQuery(int JobId, string UserId, string ReceiverId) : IRequest<List<MessageDto>>;

public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, List<MessageDto>>
{
    private readonly IDataService _context;

    public GetMessagesQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<List<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        // Fetch messages strictly between the sender and receiver
        return await _context.Messages
            .Where(m => m.JobId == request.JobId &&
                        ((m.SenderId == request.UserId && m.ReceiverId == request.ReceiverId) ||
                         (m.SenderId == request.ReceiverId && m.ReceiverId == request.UserId))) // One-to-one condition
            .OrderBy(m => m.SentAt)
            .Select(m => new MessageDto(m.Id, m.JobId, m.SenderId, m.ReceiverId, m.Content, m.SentAt, m.IsRead))
            .ToListAsync(cancellationToken);
    }
}


