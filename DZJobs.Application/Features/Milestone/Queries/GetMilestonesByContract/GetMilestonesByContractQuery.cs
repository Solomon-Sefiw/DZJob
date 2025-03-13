using DZJobs.Application.Features.Milestone.Models;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetMilestonesByContractQuery : IRequest<List<MilestoneDto>>
{
    public int ContractId { get; set; }

    public GetMilestonesByContractQuery(int contractId)
    {
        ContractId = contractId;
    }
}

public class GetMilestonesByContractQueryHandler : IRequestHandler<GetMilestonesByContractQuery, List<MilestoneDto>>
{
    private readonly IDataService _context;

    public GetMilestonesByContractQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<List<MilestoneDto>> Handle(GetMilestonesByContractQuery request, CancellationToken cancellationToken)
    {
        return await _context.Milestones
            .Where(m => m.ContractId == request.ContractId)
            .Select(m => new MilestoneDto
            {
                Id = m.Id,
                ContractId = m.ContractId,
                Title = m.Title,
                Description = m.Description,
                Amount = m.Amount,
                DueDate = m.DueDate,
                Status = m.Status
            })
            .ToListAsync(cancellationToken);
    }
}
