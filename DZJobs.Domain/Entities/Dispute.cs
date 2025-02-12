using DZJobs.Domain.Entities;

public class Dispute : BaseEntity
{
    public string ContractId { get; set; }
    public Contract Contract { get; set; }
    public string DisputeReason { get; set; }
    public string Resolution { get; set; }
    public DisputeStatus Status { get; set; }  // Enum: Open, Resolved
    public DateTime CreatedAt { get; set; }
}
