using HCMS.Services.DataService;
using MediatR;

namespace HCMS.Application.Jobs.Commands
{
    public class UpdateJobCommand : IRequest<int>
    {
        public Guid JobId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int JobType { get; set; } // Same note as before regarding enum conversion
        public decimal Salary { get; set; }
        public int Status { get; set; } // For example, 0=Open, 1=InProgress, 2=Closed (or use enum)
    }

    public class UpdateJobCommandHandler : IRequestHandler<UpdateJobCommand, int>
    {
        private readonly IDataService _context;

        public UpdateJobCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateJobCommand request, CancellationToken cancellationToken)
        {
            var job = await _context.Jobs.FindAsync(new object[] { request.JobId }, cancellationToken);
            if (job == null)
            {
                throw new KeyNotFoundException("Job not found");
            }

            job.Title = request.Title;
            job.Description = request.Description;
            job.Category = request.Category;
            job.JobType = (DZJobs.Domain.Entities.JobType)request.JobType;
            job.Salary = request.Salary;
            job.Status = (DZJobs.Domain.Entities.JobStatus)request.Status;

            _context.Jobs.Update(job);
           await _context.SaveAsync(cancellationToken);

            return job.Id;
        }
    }
}
