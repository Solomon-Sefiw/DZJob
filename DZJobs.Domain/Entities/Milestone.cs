using DZJobs.Domain.Entities;

public class Milestone : BaseEntity
{
    public int ContractId { get; set; }
    public Contract Contract { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; } 
    public DateTime DueDate { get; set; }
    public MilestoneStatus Status { get; set; }  // Enum: Pending, Completed
}
