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
    public record GetJobListQuery(JobStatus Status, int PageNumber, int PageSize) : IRequest<JobSearchResult>;
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
                JobType = job.JobType.ToString(),
                Salary = job.Salary,
                PostedDate = job.PostedDate,
                EmployerId = job.EmployerId,
                EmployerName = job.Employer?.UserName ?? "Unknown",
                Status = job.Status
            }).ToList();
            if (request.Status == JobStatus.InProgress)
            {
                var result = joblist.Where(JR => JR.Status == JobStatus.InProgress)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Jobs.Where(JR => JR.Status == JobStatus.InProgress).CountAsync();
                return new(result, count);
            }
            else if (request.Status == JobStatus.Archived)
            {
                var result = joblist.Where(JR => JR.Status == JobStatus.Archived)
                                                 .Skip((request.PageNumber - 1) * request.PageSize)
                                                 .Take(request.PageSize)
                                                 .ToList();
                var count = await dataService.Jobs.Where(JR =>
                        JR.Status == JobStatus.Archived).CountAsync();
                return new(result, count);
            }
            else if (request.Status == JobStatus.Open)
            {
                var result = joblist.Where(JR => JR.Status == JobStatus.Open)
                                            .Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize)
                                            .ToList();
                var count = await dataService.Jobs.Where(JR =>
                        JR.Status == JobStatus.Open).CountAsync();
                return new(result, count);
            }
            else
            {
                var result = joblist.Where(JR => JR.Status == JobStatus.Closed)
                                                .Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize)
                                                .ToList();
                var count = await dataService.Jobs.Where(JR =>
                            JR.Status == JobStatus.Closed).CountAsync();
                return new(result, count);
            }
            return null;
        }
    }

}
