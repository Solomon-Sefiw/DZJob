using MediatR;
using DZJobs.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HCMS.Services.DataService;

namespace HCMS.Application.Jobs.Queries
{
    public class GetJobByIdQuery : IRequest<Job>
    {
        public int Id { get; set; }
        public GetJobByIdQuery(int jobId) => Id = jobId;
    }

    public class GetJobByIdQueryHandler : IRequestHandler<GetJobByIdQuery, Job>
    {
        private readonly IDataService _context;

        public GetJobByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<Job> Handle(GetJobByIdQuery request, CancellationToken cancellationToken)
        {
            var job = await _context.Jobs
                                    .Include(j => j.Employer)
                                    .FirstOrDefaultAsync(j => j.Id == request.Id, cancellationToken);
            if (job == null)
            {
                throw new KeyNotFoundException("Job not found");
            }

            return job;
        }
    }
}
