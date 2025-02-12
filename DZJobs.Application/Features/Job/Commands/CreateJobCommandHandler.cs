using HCMS.Services.DataService;
using MediatR;


public class CreateJobCommandHandler : IRequestHandler<CreateJobCommand, int>
{
    private readonly IDataService _context;

    public CreateJobCommandHandler(IDataService context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateJobCommand request, CancellationToken cancellationToken)
    {
        var job = new Job
        {
            Title = request.Title,
            Description = request.Description,
            Category = request.Category,
            JobType = request.JobType,
            Salary = request.Salary,
            EmployerId = request.EmployerId
        };
        await _context.Jobs.AddAsync(job);
        await _context.SaveAsync(cancellationToken);
        return job.Id;
    }
}
