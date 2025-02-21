using HCMS.Services.DataService;
using MediatR;

public class GetEmploymentHistoryQuery : IRequest<EmploymentHistoryDto>
{
    public int Id { get; set; }
}

public class GetEmploymentHistoryQueryHandler : IRequestHandler<GetEmploymentHistoryQuery, EmploymentHistoryDto>
{
    private readonly IDataService _context;

    public GetEmploymentHistoryQueryHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<EmploymentHistoryDto> Handle(GetEmploymentHistoryQuery request, CancellationToken cancellationToken)
    {
        var employmentHistory = await _context.EmploymentHistories.FindAsync(request.Id);
        if (employmentHistory == null) return null;

        return new EmploymentHistoryDto
        {
            Id = employmentHistory.Id,
            UserId = employmentHistory.UserId,
            CompanyName = employmentHistory.CompanyName,
            JobTitle = employmentHistory.JobTitle,
            StartDate = employmentHistory.StartDate,
            EndDate = employmentHistory.EndDate,
            Description = employmentHistory.Description
        };
    }
}
