using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.JobSkill.Command.DeleteJobSkill
{

    public record RemoveJobSkillCommand(int JobSkillId) : IRequest<bool>;
    public class RemoveJobSkillHandler : IRequestHandler<RemoveJobSkillCommand, bool>
    {
        private readonly IDataService _context;

        public RemoveJobSkillHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<bool> Handle(RemoveJobSkillCommand request, CancellationToken cancellationToken)
        {
            var jobSkill = _context.JobSkills.FirstOrDefault(us => us.Id == request.JobSkillId);
            if (jobSkill == null)
                return false;

            _context.JobSkills.Remove(jobSkill);
            await _context.SaveAsync(cancellationToken);
            return true;
        }
    }
}
