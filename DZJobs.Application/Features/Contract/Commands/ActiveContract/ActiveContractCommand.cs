using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Commands.ActiveContract
{

    public class ActiveContractCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

    public class ActiveContractCommandHandler : IRequestHandler<ActiveContractCommand, int>
    {
        private readonly IDataService _context;

        public ActiveContractCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(ActiveContractCommand request, CancellationToken cancellationToken)
        {
            var contract = await _context.Contracts.FindAsync(request.Id);
            if (contract?.Id != null)
            {
                var milestones = await _context.Milestones
                    .Where(m => m.ContractId == contract.Id && m.Status == MilestoneStatus.Pending)
                    .ToListAsync();

                foreach (var milestone in milestones)
                {
                    milestone.Status = MilestoneStatus.InProgress; // Change to the desired status
                }
            }
            contract.Status = ContractStatus.Active;
            await _context.SaveAsync(cancellationToken);
            return contract.Id;
        }
    }
}
