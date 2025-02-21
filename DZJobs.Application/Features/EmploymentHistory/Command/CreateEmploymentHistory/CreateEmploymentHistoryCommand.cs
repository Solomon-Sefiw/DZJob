using HCMS.Services.DataService;
using MediatR;

public class CreateEmploymentHistoryCommand : IRequest<int>
{
    public string UserId { get; set; }
    public string CompanyName { get; set; }
    public string JobTitle { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Description { get; set; }
}

public class CreateEmploymentHistoryCommandHandler : IRequestHandler<CreateEmploymentHistoryCommand, int>
{
    private readonly IDataService _context;

    public CreateEmploymentHistoryCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateEmploymentHistoryCommand request, CancellationToken cancellationToken)
    {
        var employmentHistory = new EmploymentHistory
        {
            UserId = request.UserId,
            CompanyName = request.CompanyName,
            JobTitle = request.JobTitle,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Description = request.Description,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        _context.EmploymentHistories.Add(employmentHistory);
        await _context.SaveAsync(cancellationToken);

        return employmentHistory.Id;
    }
}
