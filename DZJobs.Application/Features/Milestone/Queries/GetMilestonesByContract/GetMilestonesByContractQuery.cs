using DZJobs.Application.Features.JobApplication.Models;
using DZJobs.Application.Features.Milestone.Models;
using DZJobs.Domain.Entities;
using HCMS.Application.JobApplications.Queries;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;


public record GetMilestonesByContractQuery(int contractId) : IRequest<MilestoneSearchByContractResult>;
public record MilestoneSearchByContractResult(List<MilestoneDto> Items, int TotalCount);
public class GetMilestonesByContractQueryHandler : IRequestHandler<GetMilestonesByContractQuery, MilestoneSearchByContractResult>
{
    private readonly IDataService _context;

    public GetMilestonesByContractQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<MilestoneSearchByContractResult> Handle(GetMilestonesByContractQuery request, CancellationToken cancellationToken)
    {

        var applications = await _context.Milestones
                                .Include(ja => ja.Contract)
                                .Where(m => m.ContractId == request.contractId).ToListAsync();
        var milestoneList = applications.Select(m => new MilestoneDto
        {
            Id = m.Id,
            ContractId = m.ContractId,
            Title = m.Title,
            Description = m.Description,
            Amount = m.Amount,
            DueDate = m.DueDate,
            Status = m.Status
        }).ToList();

        var count = await _context.Milestones.Where(m => m.ContractId == request.contractId).CountAsync();
        return new (milestoneList, count);
    }
}
