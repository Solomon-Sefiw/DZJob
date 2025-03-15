using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using DZJobs.Domain.User;

namespace DZJobs.Application.Features.JobApplication.Models
{
   public class JobApplicationDto
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public string Job { get; set; }
        public string FreelancerId { get; set; }
        public string Freelancer { get; set; }
        public string EmployerId { get; set; }
        public string CoverLetter { get; set; }
        public decimal ProposedSalary { get; set; }
        public DateTime AppliedDate { get; set; }
        public ApplicationStatus Status { get; set; }  // Enum: Pending, Accepted, Rejected
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

