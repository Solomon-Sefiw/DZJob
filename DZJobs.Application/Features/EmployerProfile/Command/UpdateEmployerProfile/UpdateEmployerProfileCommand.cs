using MediatR;
using HCMS.Services.DataService; // Adjust namespace

namespace HCMS.Application.EmployerProfiles.Commands
{
    public class UpdateEmployerProfileCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string Logo { get; set; }
        public int JobHistoryCount { get; set; }
        public double AverageRating { get; set; }
    }

    public class UpdateEmployerProfileCommandHandler : IRequestHandler<UpdateEmployerProfileCommand, int>
    {
        private readonly IDataService _context;

        public UpdateEmployerProfileCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateEmployerProfileCommand request, CancellationToken cancellationToken)
        {
            var employerProfile = await _context.EmployerProfiles.FindAsync(new object[] { request.Id }, cancellationToken);
            if (employerProfile == null)
                throw new KeyNotFoundException("Employer profile not found.");

            employerProfile.CompanyName = request.CompanyName;
            employerProfile.CompanyDescription = request.CompanyDescription;
            employerProfile.Logo = request.Logo;
            employerProfile.JobHistoryCount = request.JobHistoryCount;
            employerProfile.AverageRating = request.AverageRating;
            employerProfile.UpdatedAt = DateTime.UtcNow;

            _context.EmployerProfiles.Update(employerProfile);
            await _context.SaveAsync(cancellationToken);

            return employerProfile.Id;
        }
    }
}
