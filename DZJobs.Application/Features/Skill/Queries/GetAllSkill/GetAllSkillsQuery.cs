using MediatR;
using Microsoft.EntityFrameworkCore;
using DZJobs.Application.Features.Skill.Models;
using HCMS.Services.DataService; // Adjust namespace

namespace HCMS.Application.Skills.Queries
{
    public class GetAllSkillsQuery : IRequest<List<SkillDto>> { }

    public class GetAllSkillsQueryHandler : IRequestHandler<GetAllSkillsQuery, List<SkillDto>>
    {
        private readonly IDataService _context;

        public GetAllSkillsQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<SkillDto>> Handle(GetAllSkillsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Skills
                .AsNoTracking()
                .Select(s => new SkillDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Category = s.Category
                })
                .ToListAsync(cancellationToken);
        }
    }
}
