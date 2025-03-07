using MediatR;
using HCMS.Services.DataService;
using DZJobs.Domain.Entities; // Adjust namespace for your ApplicationDbContext

namespace HCMS.Application.Skills.Commands
{
    public class CreateSkillCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Category { get; set; }
    }

    public class CreateSkillCommandHandler : IRequestHandler<CreateSkillCommand, int>
    {
        private readonly IDataService _context;

        public CreateSkillCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateSkillCommand request, CancellationToken cancellationToken)
        {
            var skill = new Skill
            {
                Name = request.Name,
                Category = request.Category,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Skills.Add(skill);
            await _context.SaveAsync(cancellationToken);

            return skill.Id;
        }
    }
}
