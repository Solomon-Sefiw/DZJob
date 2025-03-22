using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Milestone.Commands.CompletedMilestone
{
    public class CompleteMilestoneCommand : IRequest<int>
    {
        public int MilestoneId { get; set; }
    }
    public class CompleteMilestoneCommandHandler : IRequestHandler<CompleteMilestoneCommand, int>
    {
        private readonly IDataService _context;

        public CompleteMilestoneCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CompleteMilestoneCommand request, CancellationToken cancellationToken)
        {
            var milestone = await _context.Milestones
                .Include(m => m.Contract) // Ensure Contract is loaded
                .FirstOrDefaultAsync(m => m.Id == request.MilestoneId, cancellationToken);

            // Mark the milestone as completed
            milestone.Status = MilestoneStatus.Completed;
            await _context.SaveAsync(cancellationToken);

            // Check if all milestones for this contract are completed
            bool allMilestonesCompleted = await _context.Milestones
                .Where(m => m.ContractId == milestone.ContractId)
                .AllAsync(m => m.Status == MilestoneStatus.Completed, cancellationToken);

            if (allMilestonesCompleted)
            {
                var contract = await _context.Contracts
                    .FirstOrDefaultAsync(c => c.Id == milestone.ContractId, cancellationToken);

                if (contract != null && contract.Status != ContractStatus.Completed)
                {
                    contract.Status = ContractStatus.Completed;
                    await _context.SaveAsync(cancellationToken);
                }
            }

            return milestone.Id;
        }
    }

}
