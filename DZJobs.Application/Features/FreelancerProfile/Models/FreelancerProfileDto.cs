using System;

namespace DZJobs.Application.Features.FreelancerProfile.Models
{
    // Make sure the DTO is declared as public
    public class FreelancerProfileDto
    {
        public int Id { get; set; }
        public string Bio { get; set; }
        public string Skills { get; set; } // Comma-separated list or JSON
        public string Portfolio { get; set; } // Links to work samples
        public double Rating { get; set; }
        public int Experience { get; set; } // Years of experience
        public decimal HourlyRate { get; set; }
        public string Location { get; set; }
        public string DZJobUserId { get; set; } // FK to User
        public string DZJobUser { get; set; } // Navigation property to User
    }
}
