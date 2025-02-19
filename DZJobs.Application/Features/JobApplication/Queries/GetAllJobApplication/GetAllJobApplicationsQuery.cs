using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Application.JobApplications.Queries
{
    public class GetAllJobApplicationsQuery : IRequest<List<JobApplication>> { }

    public class GetAllJobApplicationsQueryHandler : IRequestHandler<GetAllJobApplicationsQuery, List<JobApplication>>
    {
        private readonly IDataService _context;

        public GetAllJobApplicationsQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<JobApplication>> Handle(GetAllJobApplicationsQuery request, CancellationToken cancellationToken)
        {
            return await _context.JobApplications
                                 .Include(ja => ja.Job)
                                 .Include(ja => ja.Freelancer)
                                 .ToListAsync(cancellationToken);
        }
    }
}
