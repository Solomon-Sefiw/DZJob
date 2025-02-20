using MediatR;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService; // Replace with your actual DbContext namespace

namespace HCMS.Application.JobApplications.Commands
{
    internal class CreateJobApplicationCommand
    {
        public int JobId { get; set; }
        public string FreelancerId { get; set; }
        public string CoverLetter { get; set; }
        public decimal ProposedSalary { get; set; }
    }

    public class CreateJobApplicationCommandHandler : IRequestHandler<CreateJobApplicationCommand, int>
    {
        private readonly IDataService _context;

        public CreateJobApplicationCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateJobApplicationCommand request, CancellationToken cancellationToken)
        {
            var jobApplication = new JobApplication
            {
                JobId = request.JobId,
                FreelancerId = request.FreelancerId,
                CoverLetter = request.CoverLetter,
                ProposedSalary = request.ProposedSalary,
                AppliedDate = DateTime.UtcNow,
                Status = ApplicationStatus.Pending,  // Assuming Pending is the default
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.JobApplications.Add(jobApplication);
            await _context.SaveAsync(cancellationToken);

            return jobApplication.Id;
        }
    }
}
