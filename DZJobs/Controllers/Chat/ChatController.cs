using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DZJobs.Controllers.Chat
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : BaseController<ChatController>
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        // API endpoint to send a message
        [HttpPost("send-message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            await _hubContext.Clients.User(request.ReceiverId).SendAsync("ReceiveMessage", request.SenderId, request.Message);
            return Ok(new { status = "Message sent successfully!" });
        }
    }

    public class MessageRequest
    {
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string Message { get; set; }
    }
}
