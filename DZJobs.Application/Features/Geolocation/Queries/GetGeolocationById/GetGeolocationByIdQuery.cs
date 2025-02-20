using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Application.Geolocations.Models;
using HCMS.Services.DataService;

namespace HCMS.Application.Geolocations.Queries
{
    public class GetGeolocationByIdQuery : IRequest<GeolocationDto>
    {
        public int Id { get; set; }
        public GetGeolocationByIdQuery(int id) => Id = id;
    }

    public class GetGeolocationByIdQueryHandler : IRequestHandler<GetGeolocationByIdQuery, GeolocationDto>
    {
        private readonly IDataService _context;

        public GetGeolocationByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<GeolocationDto> Handle(GetGeolocationByIdQuery request, CancellationToken cancellationToken)
        {
            var geolocation = await _context.Geolocations
                .AsNoTracking()
                .FirstOrDefaultAsync(g => g.Id == request.Id, cancellationToken);

            if (geolocation == null)
                throw new KeyNotFoundException("Geolocation record not found.");

            return new GeolocationDto
            {
                Id = geolocation.Id,
                UserId = geolocation.UserId,
                Latitude = geolocation.Latitude,
                Longitude = geolocation.Longitude
            };
        }
    }
}
