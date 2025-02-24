using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DZJobs.Application.Features.UserSkill.Models
{
    public class UserSkillDto
    {
        public int Id { get; set; }
        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public string UserId { get; set; }
    }
}
