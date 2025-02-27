using DZJobs.Application.Features.Job.Queries.GetJobCountByStatus;
using DZJobs.Application.Features.Job.Queries.GetJobList;
using DZJobs.Application.Features.JobApplication.Models;
using DZJobs.Application.Features.JobApplication.Queries.GetJobApplicationCountByStatus;
using DZJobs.Application.Features.JobApplication.Queries.GetJobApplicationList;
using DZJobs.Application.Features.Queries.GetJobList;
using DZJobs.Domain.Entities;
using HCMS.API.Controllers;
using HCMS.Application.JobApplications.Commands;
using HCMS.Application.JobApplications.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.JobApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationsController : BaseController<JobApplicationsController>
    {
        [HttpPost("Create", Name = "CreateJobApplication")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CreateJobApplication([FromBody] CreateJobApplicationCommand command)
        {
            var id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpGet("getById{id:int}", Name = "GetJobApplicationById")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetJobApplicationById(int id)
        {
            var application = await mediator.Send(new GetJobApplicationByIdQuery(id));
            return Ok(application);
        }


        [HttpGet("all", Name = "GetAllJobApplications")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<JobApplicationDto>>> GetAllJobApplications()
        {
            var applications = await mediator.Send(new GetAllJobApplicationsQuery());
            return Ok(applications);
        }

        [HttpPut("all", Name = "UpdateJobApplication")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateJobApplication([FromBody] UpdateJobApplicationCommand command)
        {
            var jobApplicationId = await mediator.Send(command);
            return jobApplicationId;
        }
        [HttpGet("counts", Name = "GetJobApplicationCountByStatus")]
        [ProducesResponseType(200)]
        public async Task<JobApplicationCountsByStatus> GetJobApplicationCountByStatus(string FreelancerId)
        {
            return await mediator.Send(new GetJobApplicationCountByStatusQuery(FreelancerId));
        }
        [HttpGet("allByStatus", Name = "GetAllJobApplicationByStatus")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<JobApplicationSearchResult>> GetAllJobApplicationByStatus(ApplicationStatus status, string FreelancerId, int pageNumber, int pageSize)
        {
            var searchResult = await mediator.Send(new GetJobApplicationListQuery(status, FreelancerId, pageNumber, pageSize));

            return searchResult;
        }
        [HttpGet("allOpenJobByStatus", Name = "GetAllOpenJobByStatus")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<OpenJobSearchResult>> GetAllOpenJobByStatus(JobStatus status, int pageNumber, int pageSize)
        {
            var searchResult = await mediator.Send(new GetOpenJobsForApplicationQuery(status, pageNumber, pageSize));
            return searchResult;
        }
    }
}
