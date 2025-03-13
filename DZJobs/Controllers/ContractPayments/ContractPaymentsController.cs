using DZJobs.Application.Features.ContractPayment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.ContractPayments
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractPaymentsController : BaseController<ContractPaymentsController>
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateContractPaymentCommand command)
        {
            var id = await mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContractPaymentDto>> GetById(int id)
        {
            return await mediator.Send(new GetContractPaymentByIdQuery(id));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateContractPaymentStatusCommand command)
        {
            command.Id = id;
            await mediator.Send(command);
            return NoContent();
        }

        [HttpGet("freelancer/{freelancerId}")]
        public async Task<ActionResult<List<ContractPaymentDto>>> GetByFreelancer(string freelancerId)
        {
            return await mediator.Send(new GetPaymentsByFreelancerQuery(freelancerId));
        }
    }
}
