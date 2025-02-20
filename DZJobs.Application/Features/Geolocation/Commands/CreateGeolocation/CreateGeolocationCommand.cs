using HCMS.Services.DataService;
using MediatR;

namespace HCMS.Application.Geolocations.Commands
{
    public class CreateGeolocationCommand : IRequest<int>
    {
        public string UserId { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

    public class CreateGeolocationCommandHandler : IRequestHandler<CreateGeolocationCommand, int>
    {
        private readonly IDataService _context;

        public CreateGeolocationCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateGeolocationCommand request, CancellationToken cancellationToken)
        {
            var geolocation = new Geolocation
            {
                UserId = request.UserId,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Geolocations.Add(geolocation);
            await _context.SaveAsync(cancellationToken);

            return geolocation.Id;
        }
    }
}
