using HCMS.Services.DataService;
using MediatR;

public record SendMessageCommand(int JobId, string SenderId, string ReceiverId, string Content) : IRequest<int>;

public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, int>
{
    private readonly IDataService _context;

    public SendMessageCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        var message = new Message
        {
            JobId = request.JobId,
            SenderId = request.SenderId,
            ReceiverId = request.ReceiverId,
            Content = request.Content
        };

        _context.Messages.Add(message);
        await _context.SaveAsync(cancellationToken);

        return message.Id;
    }
}
