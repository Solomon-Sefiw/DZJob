﻿using System.Security.Claims;
using DZJobs.Application.Features.Job.Queries.GetJobCountByStatus;
using DZJobs.Application.Features.Job.Queries.GetJobList;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Application.Jobs.Queries;
using DZJobs.Domain.Entities;
using HCMS.API.Controllers;
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
        [HttpPost("create")]
        public async Task<ActionResult<int>> CreateJob([FromBody] CreateJobCommand command)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (userId == null) return Unauthorized();

            //command.EmployerId = userId;
            var jobId = await mediator.Send(command);
            return Ok(jobId);
        }
        [HttpGet]
        public async Task<ActionResult<List<JobDto>>> GetAllJobs()
        {
            var jobs = await mediator.Send(new GetAllJobsQuery());
            return Ok(jobs);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<JobDto>> GetJobById(int id)
        {
            var job = await mediator.Send(new GetJobByIdQuery(id));
            return Ok(job);
        }
        [HttpPut]
        public async Task<ActionResult<int>> UpdateJob([FromBody] UpdateJobCommand command)
        {
            var JobId = await mediator.Send(command);
            return JobId;
        }
        [HttpGet("counts", Name = "GetJobCountByStatus")]
        [ProducesResponseType(200)]
        public async Task<JobCountsByStatus> GetJobCountByStatus()
        {
            return await mediator.Send(new GetJobCountByStatusQuery());
        }
        [HttpGet("allJob", Name = "GetAllJob")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<JobSearchResult>> GetJobLists(JobStatus status, int pageNumber, int pageSize)
        {
            var searchResult = await mediator.Send(new GetJobListQuery(status, pageNumber, pageSize));

            return searchResult;
        }
    }
}
