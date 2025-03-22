using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public record GetUserConversationsQuery(string UserId) : IRequest<List<ConversationDto>>;

public class GetUserConversationsQueryHandler : IRequestHandler<GetUserConversationsQuery, List<ConversationDto>>
{
    private readonly IDataService _context;

    public GetUserConversationsQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<List<ConversationDto>> Handle(GetUserConversationsQuery request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        var messages = await _context.Messages
            .Where(m => m.SenderId == userId || m.ReceiverId == userId)
            .Include(m => m.Sender)
            .Include(m => m.Receiver)
            .ToListAsync(cancellationToken);

        var conversations = messages
            .GroupBy(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
            .Select(g =>
            {
                var latestMessage = g.OrderByDescending(m => m.SentAt).FirstOrDefault();
                if (latestMessage == null) return null;

                var chatPartnerId = latestMessage.SenderId == userId ? latestMessage.ReceiverId : latestMessage.SenderId;
                var chatPartnerName = latestMessage.SenderId == userId ? latestMessage.Receiver.UserName : latestMessage.Sender.UserName;

                var unreadCount = g.Count(m => m.SenderId == chatPartnerId && m.ReceiverId == userId && !m.IsRead);

                return new ConversationDto(chatPartnerId, chatPartnerName, latestMessage.Content, latestMessage.SentAt, unreadCount);
            })
            .Where(c => c != null)
            .OrderByDescending(c => c!.LastMessageTime)
            .ToList()!;

        return conversations;
    }
}
