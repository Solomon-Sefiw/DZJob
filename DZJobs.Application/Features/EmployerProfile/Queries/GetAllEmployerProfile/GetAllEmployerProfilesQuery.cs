using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Application.EmployerProfiles.Models;
using HCMS.Services.DataService;

namespace DZJobs.Application.Features.EmployerProfile.Queries.GetAllEmployerProfile
{
    public class GetAllEmployerProfilesQuery : IRequest<List<EmployerProfileDto>> { }

    public class GetAllEmployerProfilesQueryHandler : IRequestHandler<GetAllEmployerProfilesQuery, List<EmployerProfileDto>>
    {
        private readonly IDataService _context;

        public GetAllEmployerProfilesQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<EmployerProfileDto>> Handle(GetAllEmployerProfilesQuery request, CancellationToken cancellationToken)
        {
            return await _context.EmployerProfiles
                .AsNoTracking()
                .Select(ep => new EmployerProfileDto
                {
                    Id = ep.Id,
                    CompanyName = ep.CompanyName,
                    CompanyDescription = ep.CompanyDescription,
                    Logo = ep.Logo,
                    JobHistoryCount = ep.JobHistoryCount,
                    AverageRating = ep.AverageRating,
                    DZJobUserId = ep.DZJobUserId
                })
                .ToListAsync(cancellationToken);
        }
    }
}
