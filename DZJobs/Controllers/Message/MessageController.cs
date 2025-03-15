using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Message
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : BaseController<MessageController>
    {


        [HttpPost("send", Name = "SendMessage")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> SendMessage([FromBody] SendMessageCommand command)
        {
            var messageId = await mediator.Send(command);
            return Ok(new { MessageId = messageId });
        }

        [HttpGet("messages{jobId}/{userId}", Name = "GetMessages")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<MessageDto>>> GetMessages(int jobId, string userId, string ReceiverId)
        {
            var messages = await mediator.Send(new GetMessagesQuery(jobId, userId, ReceiverId));
            return Ok(messages);
        }
    }
}
