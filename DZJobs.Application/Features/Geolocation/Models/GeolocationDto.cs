namespace HCMS.Application.Geolocations.Models
{
    public class GeolocationDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
