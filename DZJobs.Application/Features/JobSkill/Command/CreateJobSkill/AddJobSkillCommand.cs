using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.JobSkill.Command.CreateJobSkill
{
    public record AddJobSkillCommand(int JobId, int SkillId) : IRequest<int>;
    public class AddJobSkillHandler : IRequestHandler<AddJobSkillCommand, int>
    {
        private readonly IDataService _context;

        public AddJobSkillHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddJobSkillCommand request, CancellationToken cancellationToken)
        {
            var jobSkill = new Domain.Entities.JobSkill { JobId = request.JobId, SkillId = request.SkillId };
            _context.JobSkills.Add(jobSkill);
            await _context.SaveAsync(cancellationToken);
            return jobSkill.Id;
        }
    }
}
