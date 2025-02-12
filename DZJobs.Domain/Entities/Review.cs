using DZJobs.Domain.User;

public class Review : BaseEntity
{
    public int JobId { get; set; }
    public Job Job { get; set; }
    public string ReviewerId { get; set; }
    public DZJobUser Reviewer { get; set; }
    public string Content { get; set; }
    public decimal Rating { get; set; }  // Rating from 1 to 5 stars
    public DateTime ReviewDate { get; set; }
}
