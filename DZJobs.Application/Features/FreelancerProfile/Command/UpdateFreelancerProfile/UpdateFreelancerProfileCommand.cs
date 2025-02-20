using MediatR;
using HCMS.Services.DataService;

namespace HCMS.Application.FreelancerProfiles.Commands
{
    public class UpdateFreelancerProfileCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Bio { get; set; }
        public string Skills { get; set; }
        public string Portfolio { get; set; }
        public double Rating { get; set; }
        public int Experience { get; set; }
        public decimal HourlyRate { get; set; }
        public string Location { get; set; }
    }

    public class UpdateFreelancerProfileCommandHandler : IRequestHandler<UpdateFreelancerProfileCommand, int>
    {
        private readonly IDataService _context;

        public UpdateFreelancerProfileCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateFreelancerProfileCommand request, CancellationToken cancellationToken)
        {
            var profile = await _context.FreelancerProfiles.FindAsync(new object[] { request.Id }, cancellationToken);
            if (profile == null)
                throw new KeyNotFoundException("Freelancer profile not found");

            profile.Bio = request.Bio;
            profile.Skills = request.Skills;
            profile.Portfolio = request.Portfolio;
            profile.Rating = request.Rating;
            profile.Experience = request.Experience;
            profile.HourlyRate = request.HourlyRate;
            profile.Location = request.Location;
            profile.UpdatedAt = DateTime.UtcNow;

            _context.FreelancerProfiles.Update(profile);
             await _context.SaveAsync(cancellationToken);

            return profile.Id;
        }
    }
}
