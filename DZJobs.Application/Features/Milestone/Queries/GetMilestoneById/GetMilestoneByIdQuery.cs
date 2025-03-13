using DZJobs.Application.Features.Milestone.Models;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetMilestoneByIdQuery : IRequest<MilestoneDto>
{
    public int Id { get; set; }

    public GetMilestoneByIdQuery(int id)
    {
        Id = id;
    }
}

public class GetMilestoneByIdQueryHandler : IRequestHandler<GetMilestoneByIdQuery, MilestoneDto>
{
    private readonly IDataService _context;

    public GetMilestoneByIdQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<MilestoneDto> Handle(GetMilestoneByIdQuery request, CancellationToken cancellationToken)
    {
        var milestone = await _context.Milestones
            .Where(m => m.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        return milestone;
    }
}
