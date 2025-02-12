using DZJobs.Domain.Entities;
using DZJobs.Domain.User;

public class JobApplication : BaseEntity
{
    public int JobId { get; set; }
    public Job Job { get; set; }
    public string FreelancerId { get; set; }
    public DZJobUser Freelancer { get; set; }
    public string CoverLetter { get; set; }
    public decimal ProposedSalary { get; set; }
    public DateTime AppliedDate { get; set; }
    public ApplicationStatus Status { get; set; }  // Enum: Pending, Accepted, Rejected
}
