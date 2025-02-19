using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService; // Adjust namespace for your ApplicationDbContext

namespace HCMS.Application.EmployerProfiles.Commands
{
    public class CreateEmployerProfileCommand : IRequest<int>
    {
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string Logo { get; set; }
        public int JobHistoryCount { get; set; }
        public double AverageRating { get; set; }
        public string DZJobUserId { get; set; }
    }

    public class CreateEmployerProfileCommandHandler : IRequestHandler<CreateEmployerProfileCommand, int>
    {
        private readonly IDataService _context;

        public CreateEmployerProfileCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateEmployerProfileCommand request, CancellationToken cancellationToken)
        {
            var employerProfile = new EmployerProfile
            {
                CompanyName = request.CompanyName,
                CompanyDescription = request.CompanyDescription,
                Logo = request.Logo,
                JobHistoryCount = request.JobHistoryCount,
                AverageRating = request.AverageRating,
                DZJobUserId = request.DZJobUserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.EmployerProfiles.Add(employerProfile);
            await _context.SaveAsync(cancellationToken);

            return employerProfile.Id;
        }
    }
}
