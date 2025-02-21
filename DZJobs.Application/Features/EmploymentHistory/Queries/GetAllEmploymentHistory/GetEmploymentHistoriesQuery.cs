using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class GetEmploymentHistoriesQuery : IRequest<List<EmploymentHistoryDto>>
{
}

public class GetEmploymentHistoriesQueryHandler : IRequestHandler<GetEmploymentHistoriesQuery, List<EmploymentHistoryDto>>
{
    private readonly IDataService _context;

    public GetEmploymentHistoriesQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<List<EmploymentHistoryDto>> Handle(GetEmploymentHistoriesQuery request, CancellationToken cancellationToken)
    {
        return await _context.EmploymentHistories
            .Select(eh => new EmploymentHistoryDto
            {
                Id = eh.Id,
                UserId = eh.UserId,
                CompanyName = eh.CompanyName,
                JobTitle = eh.JobTitle,
                StartDate = eh.StartDate,
                EndDate = eh.EndDate,
                Description = eh.Description
            })
            .ToListAsync(cancellationToken);
    }
}
