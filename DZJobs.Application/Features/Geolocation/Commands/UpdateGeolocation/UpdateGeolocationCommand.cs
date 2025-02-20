using MediatR;
using HCMS.Services.DataService; // Adjust namespace

namespace HCMS.Application.Geolocations.Commands
{
    public class UpdateGeolocationCommand : IRequest<int>
    {
        public int Id { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

    public class UpdateGeolocationCommandHandler : IRequestHandler<UpdateGeolocationCommand, int>
    {
        private readonly IDataService _context;

        public UpdateGeolocationCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateGeolocationCommand request, CancellationToken cancellationToken)
        {
            var geolocation = await _context.Geolocations.FindAsync(new object[] { request.Id }, cancellationToken);
            if (geolocation == null)
                throw new KeyNotFoundException("Geolocation record not found.");

            geolocation.Latitude = request.Latitude;
            geolocation.Longitude = request.Longitude;
            geolocation.UpdatedAt = DateTime.UtcNow;

            _context.Geolocations.Update(geolocation);
            await _context.SaveAsync(cancellationToken);

            return geolocation.Id;
        }
    }
}
