using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Application.EmployerProfiles.Models;
using HCMS.Services.DataService; // Adjust namespace

namespace HCMS.Application.EmployerProfiles.Queries
{
    public class GetEmployerProfileByIdQuery : IRequest<EmployerProfileDto>
    {
        public int Id { get; set; }
        public GetEmployerProfileByIdQuery(int id) => Id = id;
    }

    public class GetEmployerProfileByIdQueryHandler : IRequestHandler<GetEmployerProfileByIdQuery, EmployerProfileDto>
    {
        private readonly IDataService _context;

        public GetEmployerProfileByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<EmployerProfileDto> Handle(GetEmployerProfileByIdQuery request, CancellationToken cancellationToken)
        {
            var profile = await _context.EmployerProfiles
                .AsNoTracking()
                .FirstOrDefaultAsync(ep => ep.Id == request.Id, cancellationToken);

            if (profile == null)
                throw new KeyNotFoundException("Employer profile not found.");

            return new EmployerProfileDto
            {
                Id = profile.Id,
                CompanyName = profile.CompanyName,
                CompanyDescription = profile.CompanyDescription,
                Logo = profile.Logo,
                JobHistoryCount = profile.JobHistoryCount,
                AverageRating = profile.AverageRating,
                DZJobUserId = profile.DZJobUserId
            };
        }
    }
}
