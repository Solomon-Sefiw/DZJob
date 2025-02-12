using DZJobs.Domain.Entities;

public class PaymentTransaction : BaseEntity
{
    public string ContractId { get; set; }
    public Contract Contract { get; set; }
    public decimal Amount { get; set; }
    public PaymentStatus Status { get; set; }  // Enum: Pending, Successful, Failed
    public DateTime TransactionDate { get; set; }
    public string TransactionReference { get; set; }
}
