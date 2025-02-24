using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Application.Features.UserSkill.Models;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.UserSkill.Queries.GetUserSkills
{
    public record GetUserSkillsQuery(string UserId) : IRequest<List<UserSkillDto>>;
    public class GetUserSkillsHandler : IRequestHandler<GetUserSkillsQuery, List<UserSkillDto>>
    {
        private readonly IDataService _context;

        public GetUserSkillsHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<UserSkillDto>> Handle(GetUserSkillsQuery request, CancellationToken cancellationToken)
        {
            return await _context.UserSkills
                .Where(us => us.UserId == request.UserId)
                .Select(us => new UserSkillDto
                {
                    Id = us.Id,
                    UserId = us.UserId,
                    SkillId = us.SkillId,
                    SkillName = us.Skill.Name
                })
                .ToListAsync();
        }
    }
}
