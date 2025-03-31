using System.ComponentModel.DataAnnotations.Schema;
using DZJobs.Domain.Entities;
using DZJobs.Domain.User;

public class ContractPayment : BaseEntity
{
    public int MilestoneId { get; set; }
    public Milestone Milestone { get; set; }

    public string EmployerId { get; set; }
    [ForeignKey("EmployerId")]
    public DZJobUser Employer { get; set; } // Payer

    public string FreelancerId { get; set; }
    [ForeignKey("FreelancerId")]
    public DZJobUser Freelancer { get; set; } // Payee

    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public PaymentStatus Status { get; set; } // Enum: Pending, Completed, Failed
    public string? TransactionId { get; set; } // From Payment Gateway
}
