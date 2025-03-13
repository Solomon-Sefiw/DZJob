using DZJobs.Application.Features.Milestone.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Milestone
{
    [Route("api/[controller]")]
    [ApiController]
    public class MilestonesController : BaseController<MilestonesController>
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateMilestoneCommand command)
        {
            var id = await mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MilestoneDto>> GetById(int id)
        {
            return await mediator.Send(new GetMilestoneByIdQuery(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateMilestoneCommand command)
        {
            command.Id = id;
            await mediator.Send(command);
            return NoContent();
        }
    }
}
