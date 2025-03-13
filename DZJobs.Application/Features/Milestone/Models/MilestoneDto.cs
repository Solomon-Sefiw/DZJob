using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;

namespace DZJobs.Application.Features.Milestone.Models
{
    public class MilestoneDto
    {
        public int Id { get; set; }
        public int ContractId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime DueDate { get; set; }
        public MilestoneStatus Status { get; set; }
    }

}
