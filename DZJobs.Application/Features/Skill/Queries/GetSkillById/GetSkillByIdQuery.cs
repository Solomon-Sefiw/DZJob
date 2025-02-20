using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Services.DataService;
using DZJobs.Application.Features.Skill.Models; // Adjust namespace

namespace HCMS.Application.Skills.Queries
{
    public class GetSkillByIdQuery : IRequest<SkillDto>
    {
        public int Id { get; set; }
        public GetSkillByIdQuery(int id) => Id = id;
    }

    public class GetSkillByIdQueryHandler : IRequestHandler<GetSkillByIdQuery, SkillDto>
    {
        private readonly IDataService _context;

        public GetSkillByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<SkillDto> Handle(GetSkillByIdQuery request, CancellationToken cancellationToken)
        {
            var skill = await _context.Skills
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

            if (skill == null)
                throw new KeyNotFoundException("Skill not found.");

            return new SkillDto
            {
                Id = skill.Id,
                Name = skill.Name,
                Description = skill.Description
            };
        }
    }
}
