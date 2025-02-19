using DZJobs.Application.Features.JobApplication.Models;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Application.JobApplications.Queries
{
    public class GetAllJobApplicationsQuery : IRequest<List<JobApplicationDto>> { }

    public class GetAllJobApplicationsQueryHandler : IRequestHandler<GetAllJobApplicationsQuery, List<JobApplicationDto>>
    {
        private readonly IDataService _context;

        public GetAllJobApplicationsQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<JobApplicationDto>> Handle(GetAllJobApplicationsQuery request, CancellationToken cancellationToken)
        {
            var applications = await _context.JobApplications
                .Include(ja => ja.Job)
                .Include(ja => ja.Freelancer)
                .ToListAsync(cancellationToken);

            return applications.Select(ja => new JobApplicationDto
            {
                Id = ja.Id,
                JobId = ja.Job.Id,
                Job = ja.Job.Title, // Adjust if your Job entity has a different property for the job title
                FreelancerId = ja.Freelancer.Id.ToString(), // Converting to string if necessary
                Freelancer = ja.Freelancer.UserName, // Adjust if your Freelancer entity has a different property name
                CoverLetter = ja.CoverLetter,
                ProposedSalary = ja.ProposedSalary,
                AppliedDate = ja.AppliedDate,
                Status = ja.Status, // Assuming that ja.Status is of type ApplicationStatus
                CreatedAt = ja.CreatedAt,
                UpdatedAt = ja.UpdatedAt
            })
            .ToList();
        }
    }
}
