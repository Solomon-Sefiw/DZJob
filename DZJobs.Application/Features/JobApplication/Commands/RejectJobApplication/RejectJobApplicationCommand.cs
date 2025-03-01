using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.JobApplication.Commands.RejectJobApplication
{
    public record RejectJobApplicationCommand(int applicantId, int jobId) : IRequest<int>;
    public class RejectJobApplicationCommandHandler : IRequestHandler<RejectJobApplicationCommand, int>
    {
        private readonly IDataService dataService;

        public RejectJobApplicationCommandHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<int> Handle(RejectJobApplicationCommand command, CancellationToken cancellationtoken)
        {
            var job = dataService.Jobs.Where(bu => bu.Id == command.jobId).FirstOrDefault();
            job.Status = JobStatus.Closed;
            var application = dataService.JobApplications.Where(bu => bu.Id == command.applicantId).FirstOrDefault();
            application.Status = ApplicationStatus.Accepted;

            await dataService.SaveAsync(cancellationtoken);
            return job.Id;
        }
    }
}
