using DZJobs.Application.Features.Contract.Queries.GetContractById;
using DZJobs.Application.Features.Contract.Queries.GetContractsByEmployer;
using DZJobs.Application.Features.Contract.Queries.GetContractsByFreelancer;
using HCMS.Application.Educations.Models;
using HCMS.Application.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Contract
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : BaseController<ContractController>
    {
        // Queries

        [HttpGet("{id}")]
        public async Task<ActionResult<ContractDto>> GetContractById(int id)
        {
                var result = await mediator.Send(new GetContractByIdQuery(id));
                return Ok(result);
        }

        [HttpGet("freelancer/{freelancerId}")]
        public async Task<ActionResult<ContractDto>> GetContractsByFreelancer(string freelancerId)
        {
            var result = await mediator.Send(new GetContractsByFreelancerQuery(freelancerId));
            return Ok(result);
        }

        [HttpGet("employer/{employerId}")]
        public async Task<ActionResult<ContractDto>> GetContractsByEmployer(string employerId)
        {
            var result = await mediator.Send(new GetContractsByEmployerQuery(employerId));
            return Ok(result);
        }

        // Commands

        [HttpPost]
        public async Task<ActionResult<int>> CreateContract([FromBody] CreateContractCommand command)
        {

                var contractId = await mediator.Send(command);
                return Ok(contractId);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<int>> UpdateContract(int id, [FromBody] UpdateContractCommand command)
        {
            var contractId = await mediator.Send(command);
                return Ok(contractId); // Successfully updated
        }

        [HttpPut("terminate/{id}")]
        public async Task<IActionResult> TerminateContract(int id, [FromBody] TerminateContractCommand command)
        {
            var contractId = await mediator.Send(command);
                return Ok(contractId); // Successfully terminated
        }
    }
}
