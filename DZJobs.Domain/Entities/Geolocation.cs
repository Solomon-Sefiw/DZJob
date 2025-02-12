using DZJobs.Domain.User;

public class Geolocation : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
}
