using MediatR;
using HCMS.Domain.Enum;
using DZJobs.Domain.Entities;

public class CreateJobCommand : IRequest<int>
{
    public string Title { get; set; }
    public string Description { get; set; }
    public JobCategory JobCategory { get; set; }
    public JobType JobType { get; set; }
    public decimal Salary { get; set; }
    public string EmployerId { get; set; }
}
