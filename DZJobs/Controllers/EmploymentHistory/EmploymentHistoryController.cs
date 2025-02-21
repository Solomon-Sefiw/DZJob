using HCMS.API.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.EmploymentHistory
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmploymentHistoryController : BaseController<EmploymentHistoryController>
    {


        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateEmploymentHistoryCommand command)
        {
            var id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateEmploymentHistoryCommand command)
        {
            if (id != command.Id) return BadRequest();

            var result = await mediator.Send(command);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<EmploymentHistoryDto>> GetById(int id)
        {
            var result = await mediator.Send(new GetEmploymentHistoryQuery { Id = id });
            return result != null ? Ok(result) : NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<List<EmploymentHistoryDto>>> GetAll()
        {
            var result = await mediator.Send(new GetEmploymentHistoriesQuery());
            return Ok(result);
        }

    }
}
