using System.Security.Claims;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Application.Jobs.Queries;
using HCMS.API.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Api.Controllers.Job
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : BaseController<JobController>
    {
        [HttpPost("create")]
        public async Task<IActionResult> CreateJob([FromBody] CreateJobCommand command)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            command.EmployerId = userId;
            var jobId = await mediator.Send(command);
            return Ok(new { JobId = jobId, Message = "Job created successfully!" });
        }
        [HttpGet]
        public async Task<ActionResult<List<JobDto>>> GetAllJobs()
        {
            var jobs = await mediator.Send(new GetAllJobsQuery());
            return Ok(jobs);
        }
    }
}
