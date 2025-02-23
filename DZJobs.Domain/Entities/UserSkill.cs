using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DZJobs.Domain.Entities
{
    public class UserSkill : BaseEntity
    {

        public string UserId { get; set; }
        public DZJobUser User { get; set; }

        public int SkillId { get; set; }
        public Skill Skill { get; set; }
    }
}
