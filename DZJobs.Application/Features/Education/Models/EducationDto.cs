using HCMS.Domain.Enum;

namespace HCMS.Application.Educations.Models
{
    public class EducationDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string User { get; set; }
        public EducationLevelEnum EducationLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SchoolName { get; set; }
        public string SchoolCity { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime GraduationDate { get; set; }
    }
}
