using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.JobApplication.Commands.CloseJobApplication
{

    public record CloseJobApplicationCommand(int applicantId, int jobId) : IRequest<int>;
    public class CloseJobApplicationCommandHandler : IRequestHandler<CloseJobApplicationCommand, int>
    {
        private readonly IDataService dataService;

        public CloseJobApplicationCommandHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<int> Handle(CloseJobApplicationCommand command, CancellationToken cancellationtoken)
        {
            var job = dataService.Jobs.Where(bu => bu.Id == command.jobId).FirstOrDefault();
            job.Status = JobStatus.Approved;
            var application = dataService.JobApplications.Where(bu => bu.Id == command.applicantId).FirstOrDefault();
            application.Status = ApplicationStatus.Approved;

            await dataService.SaveAsync(cancellationtoken);
            return job.Id;
        }
    }
}
