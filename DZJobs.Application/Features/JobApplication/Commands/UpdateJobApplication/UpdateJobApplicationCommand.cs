using MediatR;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;

namespace HCMS.Application.JobApplications.Commands
{
    public class UpdateJobApplicationCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string CoverLetter { get; set; }
        public decimal ProposedSalary { get; set; }
        public int Status { get; set; }  // Assuming integer conversion for enum, adjust if needed
    }

    public class UpdateJobApplicationCommandHandler : IRequestHandler<UpdateJobApplicationCommand, int>
    {
        private readonly IDataService _context;

        public UpdateJobApplicationCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateJobApplicationCommand request, CancellationToken cancellationToken)
        {
            var application = await _context.JobApplications.FindAsync(new object[] { request.Id }, cancellationToken);
            if (application == null)
                throw new KeyNotFoundException("Job Application not found");

            application.CoverLetter = request.CoverLetter;
            application.ProposedSalary = request.ProposedSalary;
            application.Status = (ApplicationStatus)request.Status;
            application.UpdatedAt = DateTime.UtcNow;

            _context.JobApplications.Update(application);
            await _context.SaveAsync(cancellationToken);
            return application.Id;
        }
    }
}
