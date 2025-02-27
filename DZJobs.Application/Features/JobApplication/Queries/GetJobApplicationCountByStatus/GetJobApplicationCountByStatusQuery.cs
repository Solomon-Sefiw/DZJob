using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using DZJobs.Domain.Enum;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.JobApplication.Queries.GetJobApplicationCountByStatus
{
    public record GetJobApplicationCountByStatusQuery(string FreelancerId) : IRequest<JobApplicationCountsByStatus>;
    public record JobApplicationCountsByStatus(int Accepted, int Rejected, int Pending);

    public class GetJobApplicationCountByStatusQueryHandler : IRequestHandler<GetJobApplicationCountByStatusQuery, JobApplicationCountsByStatus>
    {
        private readonly IDataService dataService;

        public GetJobApplicationCountByStatusQueryHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<JobApplicationCountsByStatus> Handle(GetJobApplicationCountByStatusQuery request, CancellationToken cancellationToken)
        {
            var Accepted = await dataService.JobApplications.Where(JR => JR.Status == ApplicationStatus.Accepted && JR.FreelancerId == request.FreelancerId).CountAsync();
            var Rejected =  await dataService.JobApplications.Where(JR => JR.Status == ApplicationStatus.Rejected && JR.FreelancerId == request.FreelancerId).CountAsync();
            var Pending = await dataService.JobApplications.Where(JR => JR.Status == ApplicationStatus.Pending && JR.FreelancerId == request.FreelancerId).CountAsync();
            return new (Accepted, Rejected, Pending);
        }
    }
}
//Pending, Accepted, Rejected