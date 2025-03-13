using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public record GetMessagesQuery(int JobId, string UserId) : IRequest<List<MessageDto>>;

public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, List<MessageDto>>
{
    private readonly IDataService _context;

    public GetMessagesQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<List<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Messages
            .Where(m => m.JobId == request.JobId &&
                        (m.SenderId == request.UserId || m.ReceiverId == request.UserId))
            .OrderBy(m => m.SentAt)
            .Select(m => new MessageDto(m.Id, m.JobId, m.SenderId, m.ReceiverId, m.Content, m.SentAt, m.IsRead))
            .ToListAsync(cancellationToken);
    }
}


