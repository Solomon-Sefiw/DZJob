using DZJobs.Application.Features.Contract.Commands.ActiveContract;
using DZJobs.Application.Features.Contract.Commands.CompletedContract;
using DZJobs.Application.Features.Contract.Commands.SubmitedContract;
using DZJobs.Application.Features.Contract.Queries.GetContractById;
using DZJobs.Application.Features.Contract.Queries.GetContractsByEmployer;
using DZJobs.Application.Features.Contract.Queries.GetContractsByFreelancer;
using DZJobs.Application.Features.Contract.Queries.GetContractsCountByEmployer;
using DZJobs.Application.Features.Contract.Queries.GetContractsCountByFreelancer;
using DZJobs.Application.Features.JobApplication.Queries.GetJobApplicationCountByStatus;
using DZJobs.Domain.Entities;
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

        [HttpGet("{id}", Name = "GetContractById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ContractDto>> GetContractById(int id)
        {
                var result = await mediator.Send(new GetContractByIdQuery(id));
                return Ok(result);
        }

        [HttpGet("countsByEmployer", Name = "GetContractsCountByEmployer")]
        [ProducesResponseType(200)]
        public async Task<ContractCountsByEmployer> GetContractsCountByEmployer(string EmployerId)
        {
            return await mediator.Send(new GetContractsCountByEmployerQuery(EmployerId));
        }

        [HttpGet("employer", Name = "GetContractsByEmployer")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ContractSearchResult>> GetContractsByEmployer(ContractStatus status, string EmployerId, int pageNumber, int pageSize)
        {
            var result = await mediator.Send(new GetContractsByEmployerQuery(status, EmployerId, pageNumber, pageSize));
            return Ok(result);
        }

        [HttpGet("countsByFreelancer", Name = "GetContractsCountByFreelancer")]
        [ProducesResponseType(200)]
        public async Task<ContractCountsByFreelancer> GetContractsCountByFreelancer(string FreelancerId)
        {
            return await mediator.Send(new GetContractsCountByFreelancerQuery(FreelancerId));
        }

        [HttpGet("freelancer", Name = "GetContractsByFreelancer")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<ContractSearchResult>> GetContractsByFreelancer(ContractStatus status, string FreelancerId, int pageNumber, int pageSize)
        {
            var result = await mediator.Send(new GetContractsByFreelancerQuery(status, FreelancerId, pageNumber, pageSize));
            return Ok(result);
        }

        // Commands
        [HttpPost("Create", Name = "CreateContract")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> CreateContract([FromBody] CreateContractCommand command)
        {

                var contractId = await mediator.Send(command);
                return Ok(contractId);
        }

        [HttpPut("update", Name = "UpdateContract")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateContract(int id, [FromBody] UpdateContractCommand command)
        {
            var contractId = await mediator.Send(command);
                return Ok(contractId); // Successfully updated
        }

        [HttpPut("submit", Name = "SubmitContract")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SubmitContract([FromBody] SubmitContractCommand command)
        {
            var contractId = await mediator.Send(command);
            return Ok(contractId); // Successfully terminated
        }

        [HttpPut("activate", Name = "ActivateContract")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> ActivateContract([FromBody] ActiveContractCommand command)
        {
            var contractId = await mediator.Send(command);
            return Ok(contractId); // Successfully terminated
        }

        [HttpPut("complete", Name = "CompleteContract")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CompleteContract([FromBody] CompletedContractCommand command)
        {
            var contractId = await mediator.Send(command);
            return Ok(contractId); // Successfully terminated
        }


        [HttpPut("terminate", Name = "TerminateContract")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> TerminateContract([FromBody] TerminateContractCommand command)
        {
            var contractId = await mediator.Send(command);
                return Ok(contractId); // Successfully terminated
        }



    }
}
