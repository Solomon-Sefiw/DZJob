using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string senderId, string receiverId, string message)
    {
        // Send the message to the specific user
        await Clients.User(receiverId).SendAsync("ReceiveMessage", senderId, message);
    }

    public override async Task OnConnectedAsync()
    {
        // Add user to SignalR group when they connect
        string userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userId);
        }
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        // Remove user from SignalR group when they disconnect
        string userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
        }
        await base.OnDisconnectedAsync(exception);
    }
}


