using DZJobs.Domain.User;

public class Rating : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public decimal Rate { get; set; }  // Rating from 1 to 5 stars
    public DateTime RatedAt { get; set; }
}
