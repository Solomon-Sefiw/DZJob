using AutoMapper;
using DZJobs.Application.Jobs.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Services.DataService;

namespace DZJobs.Application.Jobs.Queries
{
    public class GetAllJobsQueryHandler : IRequestHandler<GetAllJobsQuery, List<JobDto>>
    {
        private readonly IDataService _context;
        private readonly IMapper _mapper;

        public GetAllJobsQueryHandler(IDataService context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<JobDto>> Handle(GetAllJobsQuery request, CancellationToken cancellationToken)
        {
            var jobs = await _context.Jobs
                .Include(j => j.Employer) // Include Employer Data
                .ToListAsync(cancellationToken);

            return jobs.Select(job => new JobDto
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
        }
    }
}
