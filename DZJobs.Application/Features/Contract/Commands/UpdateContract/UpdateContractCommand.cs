using DZJobs.Domain.Entities;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;

public class UpdateContractCommand : IRequest<int>
{
    public int Id { get; set; }
    public decimal AgreedAmount { get; set; }
    public DateTime EndDate { get; set; }
    public ContractStatus Status { get; set; }
}

public class UpdateContractCommandHandler : IRequestHandler<UpdateContractCommand,int>
{
    private readonly IDataService _context;

    public UpdateContractCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateContractCommand request, CancellationToken cancellationToken)
    {
        var contract = await _context.Contracts.FindAsync(request.Id);
        if (contract == null)
            throw new NotFoundException(nameof(Contract), request.Id);

        contract.AgreedAmount = request.AgreedAmount;
        contract.EndDate = request.EndDate;
        contract.Status = request.Status;

        await _context.SaveAsync(cancellationToken);

        return contract.Id;
    }

}
