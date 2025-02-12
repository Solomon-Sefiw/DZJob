using DZJobs.Domain.User;

public class EmploymentHistory : BaseEntity
{
    public string UserId { get; set; }
    public DZJobUser User { get; set; }
    public string CompanyName { get; set; }
    public string JobTitle { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Description { get; set; }
}
