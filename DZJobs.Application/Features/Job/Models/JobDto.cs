namespace DZJobs.Application.Jobs.DTOs
{
    public class JobDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string JobType { get; set; }  // Enum as string
        public decimal Salary { get; set; }
        public DateTime PostedDate { get; set; }
        public string EmployerId { get; set; }
        public string EmployerName { get; set; }  // Extra info about employer
        public string Status { get; set; }  // Enum as string
    }
}
