using DZJobs.Domain.Entities;

public class ContractDto
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public string JobTitle { get; set; }
    public string FreelancerId { get; set; }
    public string Freelancer { get; set; }
    public string EmployerId { get; set; }
    public string Employer { get; set; }
    public decimal AgreedAmount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ContractStatus Status { get; set; }
}
