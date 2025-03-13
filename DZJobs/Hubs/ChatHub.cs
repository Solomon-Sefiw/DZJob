using MediatR;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    private readonly IMediator _mediator;

    public ChatHub(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task SendMessage(int jobId, string senderId, string receiverId, string content)
    {
        var messageId = await _mediator.Send(new SendMessageCommand(jobId, senderId, receiverId, content));
        await Clients.User(receiverId).SendAsync("ReceiveMessage", jobId, senderId, content);
    }
}
