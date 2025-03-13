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

namespace DZJobs.Application.Features.Job.Queries.GetJobCountByStatus
{
    public record GetJobCountByStatusQuery(string EmployerId) : IRequest<JobCountsByStatus>;
    public record JobCountsByStatus(int closed, int inProgress, int archived, int open);

    public class GetJobCountByStatusQueryHandler : IRequestHandler<GetJobCountByStatusQuery, JobCountsByStatus>
    {
        private readonly IDataService dataService;

        public GetJobCountByStatusQueryHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<JobCountsByStatus> Handle(GetJobCountByStatusQuery request, CancellationToken cancellationToken)
        {
            var closed = await dataService.Jobs.Where(JR => JR.Status == JobStatus.Closed && JR.EmployerId == request.EmployerId).CountAsync();
            var inProgress = await dataService.Jobs.Where(JR => JR.Status == JobStatus.InProgress && JR.EmployerId == request.EmployerId).CountAsync();
            var archived =  await dataService.Jobs.Where(JR => JR.Status == JobStatus.Archived && JR.EmployerId == request.EmployerId).CountAsync();
            var open = await dataService.Jobs.Where(JR => (JR.Status == JobStatus.Open || JR.Status == JobStatus.InProgress) && JR.EmployerId == request.EmployerId).CountAsync();
            return new (closed, inProgress, archived, open);
        }
    }
}
