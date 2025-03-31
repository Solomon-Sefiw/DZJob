
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using DZJobs.Application.Features.FreelancerProfile.Models;
using System.Collections.Generic;

namespace DZJobs.Application.Features.FreelancerProfile.Queries.GetFreelancerProfileByFreelancerId
{
    public class GetFreelancerProfileByFreelancerIdQuery : IRequest<FreelancerProfileDto>
    {
        public string Id { get; set; }
        public GetFreelancerProfileByFreelancerIdQuery(string id) => Id = id;
    }

    public class GetFreelancerProfileByFreelancerIdQueryHandler : IRequestHandler<GetFreelancerProfileByFreelancerIdQuery, FreelancerProfileDto>
    {
        private readonly IDataService _context;

        public GetFreelancerProfileByFreelancerIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<FreelancerProfileDto> Handle(GetFreelancerProfileByFreelancerIdQuery request, CancellationToken cancellationToken)
        {
            var profile = await _context.FreelancerProfiles
                                        .Include(fp => fp.DZJobUser) // Optional: load navigation property if needed
                                        .FirstOrDefaultAsync(fp => fp.DZJobUserId == request.Id, cancellationToken);

            if (profile == null)
                throw new KeyNotFoundException("Freelancer profile not found");

            // Map the entity to the DTO
            var profileDto = new FreelancerProfileDto
            {
                Bio = profile.Bio,
                Skills = profile.Skills,
                Portfolio = profile.Portfolio,
                Rating = profile.Rating,
                Experience = profile.Experience,
                HourlyRate = profile.HourlyRate,
                Location = profile.Location,
                DZJobUserId = profile.DZJobUserId,
                DZJobUser = profile.DZJobUser?.FirstName // Use null-conditional operator if DZJobUser might be null
            };

            return profileDto;
        }
    }
}


