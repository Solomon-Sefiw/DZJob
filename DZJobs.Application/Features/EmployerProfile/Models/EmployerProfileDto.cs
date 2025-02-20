namespace HCMS.Application.EmployerProfiles.Models
{
    public class EmployerProfileDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string Logo { get; set; }
        public int JobHistoryCount { get; set; }
        public double AverageRating { get; set; }
        public string DZJobUserId { get; set; }
    }
}
