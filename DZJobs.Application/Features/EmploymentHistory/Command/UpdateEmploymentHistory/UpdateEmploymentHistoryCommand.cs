using HCMS.Services.DataService;
using MediatR;

public class UpdateEmploymentHistoryCommand : IRequest<int>
{
    public int Id { get; set; }
    public string CompanyName { get; set; }
    public string JobTitle { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Description { get; set; }
}

public class UpdateEmploymentHistoryCommandHandler : IRequestHandler<UpdateEmploymentHistoryCommand, int>
{
    private readonly IDataService _context;

    public UpdateEmploymentHistoryCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateEmploymentHistoryCommand request, CancellationToken cancellationToken)
    {
        var employmentHistory = await _context.EmploymentHistories.FindAsync(request.Id);
        employmentHistory.CompanyName = request.CompanyName;
        employmentHistory.JobTitle = request.JobTitle;
        employmentHistory.StartDate = request.StartDate;
        employmentHistory.EndDate = request.EndDate;
        employmentHistory.Description = request.Description;
        employmentHistory.UpdatedAt = DateTime.Now;

        await _context.SaveAsync(cancellationToken);
        return employmentHistory.Id;
    }
}
