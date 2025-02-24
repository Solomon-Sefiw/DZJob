using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.UserSkill.Command.DeleteUserSkill
{
    public record RemoveUserSkillCommand(int UserSkillId) : IRequest<bool>;
    public class RemoveUserSkillHandler : IRequestHandler<RemoveUserSkillCommand, bool>
    {
        private readonly IDataService _context;

        public RemoveUserSkillHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<bool> Handle(RemoveUserSkillCommand request, CancellationToken cancellationToken)
        {
            var userSkill = _context.UserSkills.FirstOrDefault(us => us.Id == request.UserSkillId);
            if (userSkill == null)
                return false;

            _context.UserSkills.Remove(userSkill);
            await _context.SaveAsync(cancellationToken);
            return true;
        }
    }
}
