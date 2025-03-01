using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.JobApplication.Commands.ApproveJobApplication
{
    public record ApproveJobApplicationCommand(int applicantId,int jobId) : IRequest<int>;
    public class ApproveJobApplicationCommandHandler : IRequestHandler<ApproveJobApplicationCommand, int>
    {
        private readonly IDataService dataService;

        public ApproveJobApplicationCommandHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<int> Handle(ApproveJobApplicationCommand command, CancellationToken cancellationtoken)
        {
            var job = dataService.Jobs.Where(bu => bu.Id == command.jobId).FirstOrDefault();
            job.Status = JobStatus.InProgress;
            var application = dataService.JobApplications.Where(bu => bu.Id == command.applicantId).FirstOrDefault();
            application.Status = ApplicationStatus.Accepted;

            await dataService.SaveAsync(cancellationtoken);
            return job.Id;
        }
    }
}
