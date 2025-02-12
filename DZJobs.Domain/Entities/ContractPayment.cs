using DZJobs.Domain.Entities;

public class ContractPayment : BaseEntity
{
    public string ContractId { get; set; }
    public Contract Contract { get; set; }
    public decimal Amount { get; set; }
    public PaymentStatus Status { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentMethod { get; set; }  // Stripe, PayPal, Bank Transfer
}
