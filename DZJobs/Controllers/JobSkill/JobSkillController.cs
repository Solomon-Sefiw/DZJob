using DZJobs.Application.Features.JobSkill.Command.CreateJobSkill;
using DZJobs.Application.Features.JobSkill.Command.DeleteJobSkill;
using DZJobs.Application.Features.JobSkill.Models;
using DZJobs.Application.Features.JobSkill.Queries.GetJobSkills;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.JobSkill
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobSkillController : BaseController<JobSkillController>
    {
        [HttpGet("getByJobId", Name = "GetJobSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<JobSkillDto>>> GetJobSkill(int jobId)
        {
            return await mediator.Send(new GetJobSkillsQuery(jobId));
        }

        [HttpPost("add", Name = "AddJobSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> AddJobSkill([FromBody] AddJobSkillCommand command)
        {
            return await mediator.Send(command);
        }


        [HttpDelete("remove", Name = "RemoveJobSkill")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<bool>> RemoveJobSkill(int jobSkillId)
        {
            return await mediator.Send(new RemoveJobSkillCommand(jobSkillId));
        }
    }
}
