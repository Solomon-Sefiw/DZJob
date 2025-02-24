using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.UserSkill.Command.CreateUserSkill
{
    public record AddUserSkillCommand(string UserId, int SkillId) : IRequest<int>;
    public class AddUserSkillHandler : IRequestHandler<AddUserSkillCommand, int>
    {
        private readonly IDataService _context;

        public AddUserSkillHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddUserSkillCommand request, CancellationToken cancellationToken)
        {
            var userSkill = new Domain.Entities.UserSkill { UserId = request.UserId, SkillId = request.SkillId };
            _context.UserSkills.Add(userSkill);
            await _context.SaveAsync(cancellationToken);  
            return userSkill.Id;
        }
    }
}
