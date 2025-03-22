using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;

public class CreateContractPaymentCommand : IRequest<int>
{
    public int MilestoneId { get; set; }
    public decimal Amount { get; set; }
    public string TransactionId { get; set; }
}

public class CreateContractPaymentCommandHandler : IRequestHandler<CreateContractPaymentCommand, int>
{
    private readonly IDataService _context;

    public CreateContractPaymentCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateContractPaymentCommand request, CancellationToken cancellationToken)
    {
        var milestone = await _context.Milestones.FindAsync(request.MilestoneId);
        if (milestone == null || milestone.Status != MilestoneStatus.Completed)
            throw new Exception("Milestone must be approved before payment.");

        var payment = new ContractPayment
        {
            MilestoneId = request.MilestoneId,
            EmployerId = milestone.Contract.EmployerId,
            FreelancerId = milestone.Contract.FreelancerId,
            Amount = request.Amount,
            PaymentDate = DateTime.UtcNow,
            Status = PaymentStatus.Completed,
            TransactionId = request.TransactionId
        };

        _context.ContractPayments.Add(payment);
        await _context.SaveAsync(cancellationToken);

        return payment.Id;
    }
}
