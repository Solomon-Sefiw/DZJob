using DZJobs.Application.Features.ContractPayment.Models;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetPaymentsByFreelancerQuery : IRequest<List<ContractPaymentDto>>
{
    public string FreelancerId { get; set; }

    public GetPaymentsByFreelancerQuery(string freelancerId)
    {
        FreelancerId = freelancerId;
    }
}

public class GetPaymentsByFreelancerQueryHandler : IRequestHandler<GetPaymentsByFreelancerQuery, List<ContractPaymentDto>>
{
    private readonly IDataService _context;

    public GetPaymentsByFreelancerQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<List<ContractPaymentDto>> Handle(GetPaymentsByFreelancerQuery request, CancellationToken cancellationToken)
    {
        return await _context.ContractPayments
            .Where(p => p.FreelancerId == request.FreelancerId)
            .Select(p => new ContractPaymentDto
            {
                Id = p.Id,
                MilestoneId = p.MilestoneId,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate,
                Status = p.Status,
                TransactionId = p.TransactionId
            })
            .ToListAsync(cancellationToken);
    }
}
