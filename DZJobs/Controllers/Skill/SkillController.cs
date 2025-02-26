using DZJobs.Application.Features.Skill.Models;
using HCMS.API.Controllers;
using HCMS.Application.Skills.Commands;
using HCMS.Application.Skills.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Skill
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : BaseController<SkillController>
    {

        [HttpPost("Create", Name = "CreateSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> CreateSkill([FromBody] CreateSkillCommand command)
        {
            int skillId = await mediator.Send(command);
            return Ok(skillId);
        }

        [HttpPut("update", Name = "UpdateSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateSkill([FromBody] UpdateSkillCommand command)
        {
            int skillId = await mediator.Send(command);
            return Ok(skillId);
        }


        [HttpGet("getById{id:int}", Name = "GetSkillById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<SkillDto>> GetSkillById(int id)
        {
            var skill = await mediator.Send(new GetSkillByIdQuery(id));
            return Ok(skill);
        }

        [HttpGet("all", Name = "GetAllSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<SkillDto>>> GetAllSkill()
        {
            var skills = await mediator.Send(new GetAllSkillsQuery());
            return Ok(skills);
        }
    }
}
