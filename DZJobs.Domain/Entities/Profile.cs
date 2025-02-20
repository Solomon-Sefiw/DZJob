using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.User;

namespace DZJobs.Domain.Entities
{
    class Profile
    {
        public int ProfileId { get; set; }
        public string Bio { get; set; }
        public string Skills { get; set; }
        public string Portfolio { get; set; }
        public double Rating { get; set; }
        public int Experience { get; set; }
        public decimal HourlyRate { get; set; }
        public string Location { get; set; }
        public string UserId { get; set; } // FK to User
        public DZJobUser User { get; set; }
    }
}
