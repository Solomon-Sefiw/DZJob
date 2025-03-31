
using DZJobs.Application.Features.Milestone.Models;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Milestone
{
    [Route("api/[controller]")]
    [ApiController]
    public class MilestonesController : BaseController<MilestonesController>
    {
        [HttpPost("Create", Name = "CreateMilestone")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CreateMilestone(CreateMilestoneCommand command)
        {
            var id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpGet("getById{contractId:int}", Name = "GetMilestoneById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<MilestoneDto>> GetMilestoneById(int id)
        {
            return await mediator.Send(new GetMilestoneByIdQuery(id));
        }



        [HttpGet("getByContractId{contractId:int}", Name = "GetMilestonesByContractId")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<MilestoneSearchByContractResult>> GetMilestonesByContractId(int contractId)
        {
            return await mediator.Send(new GetMilestonesByContractQuery(contractId));
        }

        [HttpPut("update", Name = "UpdateMilestone")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateMilestone(UpdateMilestoneCommand command)
        {
            await mediator.Send(command);
            return NoContent();
        }
        [HttpPut("complete", Name = "CompleteMilestone")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CompleteMilestone([FromBody] CompleteMilestoneCommand command)
        {
            var contractId = await mediator.Send(command);
            return Ok(contractId); // Successfully terminated
        }
    }
}
