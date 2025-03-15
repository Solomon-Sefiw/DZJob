using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DZJobs.Application.Features.JobApplication.Models;
using DZJobs.Application.Jobs.DTOs;
using DZJobs.Domain.Entities;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.JobApplication.Queries.GetJobApplicationList
{
    public record JobApplicationSearchResult(List<JobApplicationDto> Items, int TotalCount);
    public record GetJobApplicationListQuery(ApplicationStatus Status, string FreelancerId, int PageNumber, int PageSize) : IRequest<JobApplicationSearchResult>;
    public class GetJobApplicationListQueryHandler : IRequestHandler<GetJobApplicationListQuery, JobApplicationSearchResult>
    {
        private readonly IMapper mapper;
        private readonly IDataService dataService;
        public GetJobApplicationListQueryHandler(IMapper mapper, IDataService dataService)
        {
            this.mapper = mapper;
            this.dataService = dataService;
        }
        public async Task<JobApplicationSearchResult> Handle(GetJobApplicationListQuery request, CancellationToken cancellationToken)
        {
            var applications = await dataService.JobApplications
                .Include(ja => ja.Job)
                .Include(ja => ja.Freelancer)
                .ToListAsync(cancellationToken);

            var applicationList = applications.Select(ja => new JobApplicationDto
            {
                Id = ja.Id,
                JobId = ja.Job.Id,
                Job = ja.Job.Title, // Adjust if your Job entity has a different property for the job title
                FreelancerId = ja.Freelancer.Id.ToString(), // Converting to string if necessary
                Freelancer = ja.Freelancer.UserName, // Adjust if your Freelancer entity has a different property name
                EmployerId = ja.Job.EmployerId,
                CoverLetter = ja.CoverLetter,
                ProposedSalary = ja.ProposedSalary,
                AppliedDate = ja.AppliedDate,
                Status = ja.Status, // Assuming that ja.Status is of type ApplicationStatus
                CreatedAt = ja.CreatedAt,
                UpdatedAt = ja.UpdatedAt
            })
            .ToList();
            if (request.Status == ApplicationStatus.Pending)
            {
                var result = applicationList.Where(JR => JR.Status == ApplicationStatus.Pending && JR.FreelancerId == request.FreelancerId)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    JobApplications.Where(JR => JR.Status == ApplicationStatus.Pending && JR.FreelancerId == request.FreelancerId).CountAsync();
                return new(result, count);
            }
            else if (request.Status == ApplicationStatus.Accepted)
            {
                var result = applicationList.Where(JR => JR.Status == ApplicationStatus.Accepted && JR.FreelancerId == request.FreelancerId)
                                                 .Skip((request.PageNumber - 1) * request.PageSize)
                                                 .Take(request.PageSize)
                                                 .ToList();
                var count = await dataService.JobApplications.Where(JR =>
                        JR.Status == ApplicationStatus.Accepted && JR.FreelancerId == request.FreelancerId).CountAsync();
                return new(result, count);
            }
            else
            {
                var result = applicationList.Where(JR => JR.Status == ApplicationStatus.Rejected && JR.FreelancerId == request.FreelancerId)
                                                .Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize)
                                                .ToList();
                var count = await dataService.JobApplications.Where(JR =>
                            JR.Status == ApplicationStatus.Rejected && JR.FreelancerId == request.FreelancerId).CountAsync();
                return new(result, count);
            }
        }
    }

}
