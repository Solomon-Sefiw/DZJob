using MediatR;
using Microsoft.EntityFrameworkCore;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using DZJobs.Application.Features.FreelancerProfile.Models;

namespace HCMS.Application.FreelancerProfiles.Queries
{
    // Make sure the query is public
    public class GetAllFreelancerProfilesQuery : IRequest<List<FreelancerProfileDto>> { }

    // Make sure the handler is public
    public class GetAllFreelancerProfilesQueryHandler : IRequestHandler<GetAllFreelancerProfilesQuery, List<FreelancerProfileDto>>
    {
        private readonly IDataService _context;

        public GetAllFreelancerProfilesQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<FreelancerProfileDto>> Handle(GetAllFreelancerProfilesQuery request, CancellationToken cancellationToken)
        {
            return await _context.FreelancerProfiles
                                 .Include(fp => fp.DZJobUser) // Optional
                                 .Select(fp => new FreelancerProfileDto
                                 {
                                     Id = fp.Id,
                                     Bio = fp.Bio,
                                     Skills = fp.Skills,
                                     Portfolio = fp.Portfolio,
                                     Rating = fp.Rating,
                                     Experience = fp.Experience,
                                     HourlyRate = fp.HourlyRate,
                                     Location = fp.Location,
                                     DZJobUserId = fp.DZJobUserId,
                                     // Adjust the following property based on your actual DZJobUser implementation
                                     DZJobUser = fp.DZJobUser.FirstName
                                 })
                                 .ToListAsync(cancellationToken);
        }
    }
}
