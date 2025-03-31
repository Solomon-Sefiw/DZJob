using DZJobs.Application.Features.UserSkill.Command.CreateUserSkill;
using DZJobs.Application.Features.UserSkill.Command.DeleteUserSkill;
using DZJobs.Application.Features.UserSkill.Models;
using DZJobs.Application.Features.UserSkill.Queries.GetUserSkills;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.UserSkill
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSkillController : BaseController<UserSkillController>
    {
        [HttpGet("getByUserId{userId}", Name = "GetUserSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<UserSkillDto>>> GetUserSkill(string userId)
        {
            return await mediator.Send(new GetUserSkillsQuery(userId));
        }

        [HttpPost("add", Name = "AddUserSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> AddUserSkill([FromBody] AddUserSkillCommand command)
        {
            return await mediator.Send(command);
        }

        [HttpDelete("remove{userSkillId}", Name = "RemoveUserSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<bool>> RemoveUserSkill(int userSkillId)
        {
            return await mediator.Send(new RemoveUserSkillCommand(userSkillId));
        }
    }
}
