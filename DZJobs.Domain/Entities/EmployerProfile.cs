using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.User;

namespace DZJobs.Domain.Entities
{
    public class EmployerProfile :BaseEntity
    {
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string Logo { get; set; } // URL to company logo
        public int JobHistoryCount { get; set; } // Number of jobs posted
        public double AverageRating { get; set; } // Average rating from freelancers

        public string DZJobUserId { get; set; } // FK to User
        public DZJobUser DZJobUser { get; set; } // Navigation property to User
        // public ICollection<Job> JobsPosted { get; set; } = new List<Job>();
        //  public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
