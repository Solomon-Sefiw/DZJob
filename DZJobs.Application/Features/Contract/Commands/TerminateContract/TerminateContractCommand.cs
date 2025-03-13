using DZJobs.Domain.Entities;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;

public class TerminateContractCommand : IRequest<int>
{
    public int Id { get; set; }
}

public class TerminateContractCommandHandler : IRequestHandler<TerminateContractCommand,int>
{
    private readonly IDataService _context;

    public TerminateContractCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(TerminateContractCommand request, CancellationToken cancellationToken)
    {
        var contract = await _context.Contracts.FindAsync(request.Id);
        if (contract == null)
            throw new NotFoundException(nameof(Contract), request.Id);
        contract.Status = ContractStatus.Terminated;
        await _context.SaveAsync(cancellationToken);
        return contract.Id;
    }
}
