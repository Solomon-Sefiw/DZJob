using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Application.Geolocations.Models;
using HCMS.Services.DataService;

namespace HCMS.Application.Geolocations.Queries
{
    public class GetAllGeolocationsQuery : IRequest<List<GeolocationDto>> { }

    public class GetAllGeolocationsQueryHandler : IRequestHandler<GetAllGeolocationsQuery, List<GeolocationDto>>
    {
        private readonly IDataService _context;

        public GetAllGeolocationsQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<GeolocationDto>> Handle(GetAllGeolocationsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Geolocations
                .AsNoTracking()
                .Select(g => new GeolocationDto
                {
                    Id = g.Id,
                    UserId = g.UserId,
                    Latitude = g.Latitude,
                    Longitude = g.Longitude
                })
                .ToListAsync(cancellationToken);
        }
    }
}
