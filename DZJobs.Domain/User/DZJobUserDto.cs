using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace DZJobs.Domain.User
{
   public class DZJobUserDto : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsVerified { get; set; }
        public string? PhotoId { get; set; }
        public string? PhotoUrl { get; set; }
        public virtual ICollection<UserDocument> UserDocuments { get; set; } = new List<UserDocument>();
    }
}

