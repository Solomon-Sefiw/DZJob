using DZJobs.Domain.Entities;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;

public class UpdateMilestoneCommand : IRequest<int>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime DueDate { get; set; }
    public MilestoneStatus Status { get; set; }
}

public class UpdateMilestoneCommandHandler : IRequestHandler<UpdateMilestoneCommand,int>
{
    private readonly IDataService _context;

    public UpdateMilestoneCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateMilestoneCommand request, CancellationToken cancellationToken)
    {
        var milestone = await _context.Milestones.FindAsync(request.Id);
        if (milestone == null)
            throw new NotFoundException(nameof(Milestone), request.Id);

        milestone.Title = request.Title;
        milestone.Description = request.Description;
        milestone.Amount = request.Amount;
        milestone.DueDate = request.DueDate;
        milestone.Status = request.Status;

        await _context.SaveAsync(cancellationToken);
        return milestone.Id;
    }
}
