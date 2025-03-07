using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Application.Features.JobSkill.Models;
using DZJobs.Application.Features.UserSkill.Models;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.JobSkill.Queries.GetJobSkills
{

    public record GetJobSkillsQuery(int JobId) : IRequest<List<JobSkillDto>>;
    public class GetJobSkillsHandler : IRequestHandler<GetJobSkillsQuery, List<JobSkillDto>>
    {
        private readonly IDataService _context;

        public GetJobSkillsHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<JobSkillDto>> Handle(GetJobSkillsQuery request, CancellationToken cancellationToken)
        {
            return await _context.JobSkills
                .Where(us => us.JobId == request.JobId)
                .Select(us => new JobSkillDto
                {
                    Id = us.Id,
                    JobId = us.JobId,
                    SkillId = us.SkillId,
                    SkillName = us.Skill.Name
                })
                .ToListAsync(cancellationToken: cancellationToken);
        }
    }
}
