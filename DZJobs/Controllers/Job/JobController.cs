using System.Security.Claims;
using DZJobs.Application.Features.Job.Queries.GetJobCountByStatus;
using DZJobs.Application.Features.Job.Queries.GetJobList;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Application.Jobs.Queries;
using DZJobs.Controllers;
using DZJobs.Domain.Entities;
using HCMS.Application.Jobs.Commands;
using HCMS.Application.Jobs.Queries;
using HCMS.Domain.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Api.Controllers.Job
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : BaseController<JobController>
    {
        [HttpPost("Create", Name = "CreateJob")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> CreateJob([FromBody] CreateJobCommand command)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (userId == null) return Unauthorized();

            //command.EmployerId = userId;
            var jobId = await mediator.Send(command);
            return Ok(jobId);
        }
        [HttpGet("allJobs", Name = "GetAllJobs")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<JobDto>>> GetAllJobs()
        {
            var jobs = await mediator.Send(new GetAllJobsQuery());
            return Ok(jobs);
        }
        [HttpGet("getById", Name = "GetJobCById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<JobDto>> GetJobById(int id)
        {
            var job = await mediator.Send(new GetJobByIdQuery(id));
            return Ok(job);
        }
        [HttpPut("update", Name = "UpdateJob")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateJob([FromBody] UpdateJobCommand command)
        {
            var JobId = await mediator.Send(command);
            return JobId;
        }
        [HttpGet("counts", Name = "GetJobCountByStatus")]
        [ProducesResponseType(200)]
        public async Task<JobCountsByStatus> GetJobCountByStatus(string EmployerId)
        {
            return await mediator.Send(new GetJobCountByStatusQuery(EmployerId));
        }
        [HttpGet("allJobByStatus", Name = "GetAllJobByStatus")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<JobSearchResult>> GetAllJobByStatus(JobStatus status, string EmployerId, int pageNumber, int pageSize)
        {
            var searchResult = await mediator.Send(new GetJobListQuery(status,EmployerId, pageNumber, pageSize));

            return searchResult;
        }
    }
}
