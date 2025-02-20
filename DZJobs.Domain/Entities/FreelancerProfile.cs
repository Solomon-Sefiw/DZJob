
using DZJobs.Domain.User;

namespace DZJobs.Domain.Entities
{
    public class FreelancerProfile : BaseEntity
    {

        public string Bio { get; set; }
        public string Skills { get; set; } // Comma-separated list or JSON
        public string Portfolio { get; set; } // Links to work samples
        public double Rating { get; set; }
        public int Experience { get; set; } // Years of experience
        public decimal HourlyRate { get; set; }
        public string Location { get; set; }
        public string DZJobUserId { get; set; } // FK to User
        public DZJobUser DZJobUser { get; set; } // Navigation property to User
       // public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
