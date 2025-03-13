using DZJobs.Domain.Entities;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;

public class UpdateContractPaymentStatusCommand : IRequest<int>
{
    public int Id { get; set; }
    public PaymentStatus Status { get; set; }
}

public class UpdateContractPaymentStatusCommandHandler : IRequestHandler<UpdateContractPaymentStatusCommand,int>
{
    private readonly IDataService _context;

    public UpdateContractPaymentStatusCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateContractPaymentStatusCommand request, CancellationToken cancellationToken)
    {
        var payment = await _context.ContractPayments.FindAsync(request.Id);
        if (payment == null)
            throw new NotFoundException(nameof(ContractPayment), request.Id);

        payment.Status = request.Status;

        await _context.SaveAsync(cancellationToken);
        return payment.Id;

    }
}
