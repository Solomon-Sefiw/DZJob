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

        [HttpPost]
        public async Task<ActionResult<int>> CreateSkill([FromBody] CreateSkillCommand command)
        {
            int skillId = await mediator.Send(command);
            return Ok(skillId);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateSkill([FromBody] UpdateSkillCommand command)
        {
            int skillId = await mediator.Send(command);
            return Ok(skillId);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<SkillDto>> GetSkillById(int id)
        {
            var skill = await mediator.Send(new GetSkillByIdQuery(id));
            return Ok(skill);
        }

        [HttpGet]
        public async Task<ActionResult<List<SkillDto>>> GetAllSkills()
        {
            var skills = await mediator.Send(new GetAllSkillsQuery());
            return Ok(skills);
        }
    }
}
