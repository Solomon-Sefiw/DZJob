using DZJobs.Domain.User;

namespace DZJobs.Domain.Entities
{
    public class Skill : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        // Navigation Property
        public ICollection<UserSkill> UserSkills { get; set; } = new List<UserSkill>();
    }
}