using DZJobs.Domain.Entities;

namespace DZJobs.Application.Jobs.DTOs
{
    public class JobDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public JobCategory JobCategory { get; set; }
        public JobType JobType { get; set; }  // Enum as string
        public decimal Salary { get; set; }
        public DateTime PostedDate { get; set; }
        public string EmployerId { get; set; }
        public string EmployerName { get; set; }  // Extra info about employer
        public JobStatus Status { get; set; }  // Enum as string
    }
}
