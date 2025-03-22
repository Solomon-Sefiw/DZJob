using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

public class CreateContractCommand : IRequest<int>
{
    public int JobId { get; set; }
    public string FreelancerId { get; set; }
    public string EmployerId { get; set; }
    public decimal AgreedAmount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class CreateContractCommandHandler : IRequestHandler<CreateContractCommand, int>
{
    private readonly IDataService _context;

    public CreateContractCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateContractCommand request, CancellationToken cancellationToken)
    {
        var contract = new Contract
        {
            JobId = request.JobId,
            FreelancerId = request.FreelancerId,
            EmployerId = request.EmployerId,
            AgreedAmount = request.AgreedAmount,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Status = ContractStatus.Draft // Default status
        };
        var application = _context.JobApplications.
            Where(bu => bu.JobId == contract.JobId && bu.FreelancerId == contract.FreelancerId).FirstOrDefault();
        application.Status = ApplicationStatus.InContract;
        _context.Contracts.Add(contract);
        await _context.SaveAsync(cancellationToken);


        return contract.Id; // Return the created contract's ID
    }
}
