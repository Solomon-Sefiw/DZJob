using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Application.JobApplications.Queries
{
    public class GetJobApplicationByIdQuery : IRequest<JobApplication>
    {
        public int Id { get; set; }
        public GetJobApplicationByIdQuery(int id) => Id = id;
    }

    public class GetJobApplicationByIdQueryHandler : IRequestHandler<GetJobApplicationByIdQuery, JobApplication>
    {
        private readonly IDataService _context;

        public GetJobApplicationByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<JobApplication> Handle(GetJobApplicationByIdQuery request, CancellationToken cancellationToken)
        {
            var application = await _context.JobApplications
                                            .Include(ja => ja.Job)
                                            .Include(ja => ja.Freelancer)
                                            .FirstOrDefaultAsync(ja => ja.Id == request.Id, cancellationToken);

            if (application == null)
                throw new KeyNotFoundException("Job Application not found");

            return application;
        }
    }
}
