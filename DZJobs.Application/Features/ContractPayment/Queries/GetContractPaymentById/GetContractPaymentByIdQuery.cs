using DZJobs.Application.Features.ContractPayment.Models;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetContractPaymentByIdQuery : IRequest<ContractPaymentDto>
{
    public int Id { get; set; }

    public GetContractPaymentByIdQuery(int id)
    {
        Id = id;
    }
}

public class GetContractPaymentByIdQueryHandler : IRequestHandler<GetContractPaymentByIdQuery, ContractPaymentDto>
{
    private readonly IDataService _context;

    public GetContractPaymentByIdQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<ContractPaymentDto> Handle(GetContractPaymentByIdQuery request, CancellationToken cancellationToken)
    {
        var payment = await _context.ContractPayments
            .Where(p => p.Id == request.Id)
            .Select(p => new ContractPaymentDto
            {
                Id = p.Id,
                MilestoneId = p.MilestoneId,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate,
                Status = p.Status,
                TransactionId = p.TransactionId
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (payment == null)
            throw new NotFoundException(nameof(ContractPayment), request.Id);

        return payment;
    }
}
