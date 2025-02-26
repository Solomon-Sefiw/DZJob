using HCMS.API.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.EmploymentHistory
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmploymentHistoryController : BaseController<EmploymentHistoryController>
    {


        [HttpPost("Create", Name = "CreateEmploymentHistory")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> CreateEmploymentHistory(CreateEmploymentHistoryCommand command)
        {
            var id = await mediator.Send(command);
            return Ok(id);
        }


        [HttpPut("update", Name = "UpdateEmploymentHistory")]
        [ProducesResponseType(200)]
        public async Task<ActionResult> UpdateEmploymentHistory(int id, UpdateEmploymentHistoryCommand command)
        {
            if (id != command.Id) return BadRequest();

            var result = await mediator.Send(command);
            return Ok(result);
        }



        [HttpGet("getById{id:int}", Name = "GetEmploymentHistoryById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<EmploymentHistoryDto>> GetEmploymentHistoryById(int id)
        {
            var result = await mediator.Send(new GetEmploymentHistoryQuery { Id = id });
            return result != null ? Ok(result) : NotFound();
        }

        [HttpGet("all", Name = "GetAllEmploymentHistory")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<EmploymentHistoryDto>>> GetAllEmploymentHistory()
        {
            var result = await mediator.Send(new GetEmploymentHistoriesQuery());
            return Ok(result);
        }

    }
}
