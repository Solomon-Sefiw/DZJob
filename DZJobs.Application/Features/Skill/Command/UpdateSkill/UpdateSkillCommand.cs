using HCMS.Services.DataService;
using MediatR;

namespace HCMS.Application.Skills.Commands
{
    public class UpdateSkillCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class UpdateSkillCommandHandler : IRequestHandler<UpdateSkillCommand, int>
    {
        private readonly IDataService _context;

        public UpdateSkillCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateSkillCommand request, CancellationToken cancellationToken)
        {
            var skill = await _context.Skills.FindAsync(new object[] { request.Id }, cancellationToken);
            if (skill == null)
                throw new KeyNotFoundException("Skill not found.");

            skill.Name = request.Name;
            skill.Description = request.Description;
            skill.UpdatedAt = DateTime.UtcNow;

            _context.Skills.Update(skill);
            await _context.SaveAsync(cancellationToken);

            return skill.Id;
        }
    }
}
