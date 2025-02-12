using HCMS.Domain.Enum;
using HCMS.Domain;
using System.Diagnostics.Contracts;
using DZJobs.Domain.Entities;
using DZJobs.Domain.User;

public class Job : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public JobType JobType { get; set; }  // Enum: Full-time, Part-time, Freelance
    public decimal Salary { get; set; }
    public DateTime PostedDate { get; set; }
    public string EmployerId { get; set; }
    public DZJobUser Employer { get; set; }
    public DZJobs.Domain.Entities.JobStatus Status { get; set; }  // Enum: Open, In Progress, Closed
    public ICollection<JobApplication> Applications { get; set; }
    public ICollection<Contract> Contracts { get; set; }
    public ICollection<Review> Reviews { get; set; }
}
