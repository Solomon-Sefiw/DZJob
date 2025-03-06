using AutoMapper;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Queries.GetJobList
{
    public record OpenJobSearchResult(List<JobDto> Items, int TotalCount);
    public record GetOpenJobsForApplicationQuery(JobStatus Status, int PageNumber, int PageSize) : IRequest<OpenJobSearchResult>;
    public class GetJobListQueryHandler : IRequestHandler<GetOpenJobsForApplicationQuery, OpenJobSearchResult>
    {
        private readonly IMapper mapper;
        private readonly IDataService dataService;
        public GetJobListQueryHandler(IMapper mapper, IDataService dataService)
        {
            this.mapper = mapper;
            this.dataService = dataService;
        }
        public async Task<OpenJobSearchResult> Handle(GetOpenJobsForApplicationQuery request, CancellationToken cancellationToken)
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
                EmployerId = job.EmployerId,
                EmployerName = job.Employer?.UserName ?? "Unknown",
                Status = job.Status
            }).ToList();

                var result = joblist.Where(JR => JR.Status == JobStatus.Open)
                                            .Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize)
                                            .ToList();
                var count = await dataService.Jobs.Where(JR =>
                        JR.Status == JobStatus.Open).CountAsync();
                return new(result, count);

        }
    }

}

