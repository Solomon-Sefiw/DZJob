using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Domain.Entities;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Job.Queries.GetJobList
{
    public record JobSearchResult(List<JobDto> Items, int TotalCount);
    public record GetJobListQuery(JobStatus Status, string EmployerId, int PageNumber, int PageSize) : IRequest<JobSearchResult>;
    public class GetJobListQueryHandler : IRequestHandler<GetJobListQuery, JobSearchResult>
    {
        private readonly IMapper mapper;
        private readonly IDataService dataService;
        public GetJobListQueryHandler(IMapper mapper, IDataService dataService)
        {
            this.mapper = mapper;
            this.dataService = dataService;
        }
        public async Task<JobSearchResult> Handle(GetJobListQuery request, CancellationToken cancellationToken)
        {
            var jobs = await dataService.Jobs
                .Include(j => j.Employer) // Include Employer Data
                .ToListAsync(cancellationToken);

            var joblist = jobs.Select(job => new JobDto
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                JobCategory = job.JobCategory,
                JobType = job.JobType,
                Salary = job.Salary,
                PostedDate = job.PostedDate,
                Location = job.Location,
                EmployerId = job.EmployerId,
                EmployerName = job.Employer?.UserName ?? "Unknown",
                Status = job.Status
            }).ToList();
            if (request.Status == JobStatus.InProgress)
            {
                var result = joblist.Where(JR => (JR.Status == JobStatus.InProgress || JR.Status == JobStatus.Approved) && JR.EmployerId == request.EmployerId)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Jobs.Where(JR => (JR.Status == JobStatus.InProgress || JR.Status == JobStatus.Approved) && JR.EmployerId == request.EmployerId).CountAsync();
                return new(result, count);
            }
            else if (request.Status == JobStatus.Archived)
            {
                var result = joblist.Where(JR => JR.Status == JobStatus.Archived && JR.EmployerId == request.EmployerId)
                                                 .Skip((request.PageNumber - 1) * request.PageSize)
                                                 .Take(request.PageSize)
                                                 .ToList();
                var count = await dataService.Jobs.Where(JR =>
                        JR.Status == JobStatus.Archived && JR.EmployerId == request.EmployerId).CountAsync();
                return new(result, count);
            }
            else if (request.Status == JobStatus.Open)
            {
                var result = joblist.Where(JR => (JR.Status == JobStatus.Open || JR.Status == JobStatus.InProgress) && JR.EmployerId == request.EmployerId)
                                            .Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize)
                                            .ToList();
                var count = await dataService.Jobs.Where(JR =>
                        (JR.Status == JobStatus.Open || JR.Status == JobStatus.InProgress) && JR.EmployerId == request.EmployerId).CountAsync();
                return new(result, count);
            }
            else
            {
                var result = joblist.Where(JR => JR.Status == JobStatus.Approved && JR.EmployerId == request.EmployerId)
                                                .Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize)
                                                .ToList();
                var count = await dataService.Jobs.Where(JR =>
                            JR.Status == JobStatus.Approved && JR.EmployerId == request.EmployerId).CountAsync();
                return new(result, count);
            }
        }
    }

}
