using DZJobs.Application.Features.UserSkill.Command.CreateUserSkill;
using DZJobs.Application.Features.UserSkill.Command.DeleteUserSkill;
using DZJobs.Application.Features.UserSkill.Models;
using DZJobs.Application.Features.UserSkill.Queries.GetUserSkills;
using HCMS.API.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.UserSkill
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSkillsController : BaseController<UserSkillsController>
    {
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<UserSkillDto>>> GetUserSkills(string userId)
        {
            return await mediator.Send(new GetUserSkillsQuery(userId));
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddUserSkill([FromBody] AddUserSkillCommand command)
        {
            return await mediator.Send(command);
        }

        [HttpDelete("{userSkillId}")]
        public async Task<ActionResult<bool>> RemoveUserSkill(int userSkillId)
        {
            return await mediator.Send(new RemoveUserSkillCommand(userSkillId));
        }
    }
}
