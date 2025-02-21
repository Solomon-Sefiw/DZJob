using MediatR;
using HCMS.Services.DataService;
using DZJobs.Domain.Entities;      // Adjust to your domain models namespace

namespace HCMS.Application.FreelancerProfiles.Commands
{
    public class CreateFreelancerProfileCommand : IRequest<int>
    {
        public string Bio { get; set; }
        public string Skills { get; set; }
        public string Portfolio { get; set; }
        public double Rating { get; set; }
        public int Experience { get; set; }
        public decimal HourlyRate { get; set; }
        public string Location { get; set; }
        public string DZJobUserId { get; set; }
    }


    public class CreateFreelancerProfileCommandHandler : IRequestHandler<CreateFreelancerProfileCommand, int>
    {
        private readonly IDataService _context;

        public CreateFreelancerProfileCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateFreelancerProfileCommand request, CancellationToken cancellationToken)
        {
            var profile = new FreelancerProfile
            {
                Bio = request.Bio,
                Skills = request.Skills,
                Portfolio = request.Portfolio,
                Rating = request.Rating,
                Experience = request.Experience,
                HourlyRate = request.HourlyRate,
                Location = request.Location,
                DZJobUserId = request.DZJobUserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.FreelancerProfiles.Add(profile);
            await _context.SaveAsync(cancellationToken);

            return profile.Id;
        }
    }
}
