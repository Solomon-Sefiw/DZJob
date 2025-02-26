using HCMS.API.Controllers;
using HCMS.Application.Educations.Commands;
using HCMS.Application.Educations.Models;
using HCMS.Application.Educations.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Education
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationsController : BaseController<EducationsController>
    {

        [HttpPost("Create", Name = "CreateEducation")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> CreateEducation([FromBody] CreateEducationCommand command)
        {
            int id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpPut("update", Name = "UpdateEducation")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateEducation([FromBody] UpdateEducationCommand command)
        {
            int id = await mediator.Send(command);
            return Ok(id);
        }


        [HttpGet("getById{id:int}", Name = "GetEducationById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<EducationDto>> GetEducationById(int id)
        {
            var education = await mediator.Send(new GetEducationByIdQuery(id));
            return Ok(education);
        }

        [HttpGet("all", Name = "GetAllEducation")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<EducationDto>>> GetAllEducation()
        {
            var educations = await mediator.Send(new GetAllEducationsQuery());
            return Ok(educations);
        }

    }
}
