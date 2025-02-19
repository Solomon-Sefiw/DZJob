using System.ComponentModel.DataAnnotations.Schema;
using DZJobs.Domain.Entities;
using DZJobs.Domain.User;

public class Contract : BaseEntity
{
    public int JobId { get; set; }
    public Job Job { get; set; }
    public string FreelancerId { get; set; }
    [ForeignKey("FreelancerId")]
    public DZJobUser Freelancer { get; set; }
    public string EmployerId { get; set; }
    [ForeignKey("EmployerId")]
    public DZJobUser Employer { get; set; }
    public decimal AgreedSalary { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ContractStatus Status { get; set; }  // Enum: Ongoing, Completed, Terminated
    public ICollection<Milestone> Milestones { get; set; }
}
