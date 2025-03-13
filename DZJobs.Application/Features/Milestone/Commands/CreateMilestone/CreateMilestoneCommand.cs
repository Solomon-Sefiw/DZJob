using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;

public class CreateMilestoneCommand : IRequest<int>
{
    public int ContractId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime DueDate { get; set; }
}

public class CreateMilestoneCommandHandler : IRequestHandler<CreateMilestoneCommand, int>
{
    private readonly IDataService _context;

    public CreateMilestoneCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateMilestoneCommand request, CancellationToken cancellationToken)
    {
        var milestone = new Milestone
        {
            ContractId = request.ContractId,
            Title = request.Title,
            Description = request.Description,
            Amount = request.Amount,
            DueDate = request.DueDate,
            Status = MilestoneStatus.Pending
        };

        _context.Milestones.Add(milestone);
        await _context.SaveAsync(cancellationToken);

        return milestone.Id;
    }
}
