namespace HCMS.Application.Educations.Models
{
    public class EducationDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string EducationLevel { get; set; } // Can be string representation of the enum
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string SchoolName { get; set; }
        public string SchoolCity { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime GraduationDate { get; set; }
    }
}
