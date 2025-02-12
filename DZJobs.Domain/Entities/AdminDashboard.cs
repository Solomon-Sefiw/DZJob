using DZJobs.Domain.User;

public class AdminDashboard : BaseEntity
{
    public string DashboardName { get; set; }
    public ICollection<Job> Jobs { get; set; }
    public ICollection<DZJobUser> Users { get; set; }
    public ICollection<Contract> Contracts { get; set; }
    public ICollection<Review> Reviews { get; set; }
    public int TotalActiveUsers { get; set; }
    public int TotalJobsPosted { get; set; }
}
