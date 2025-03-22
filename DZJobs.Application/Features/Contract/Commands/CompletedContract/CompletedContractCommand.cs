using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.Contract.Commands.CompletedContract
{
    public class CompletedContractCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

    public class CompletedContractCommandHandler : IRequestHandler<CompletedContractCommand, int>
    {
        private readonly IDataService _context;

        public CompletedContractCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CompletedContractCommand request, CancellationToken cancellationToken)
        {
            var contract = await _context.Contracts.FindAsync(request.Id);
            contract.Status = ContractStatus.Completed;
            await _context.SaveAsync(cancellationToken);
            return contract.Id;
        }
    }
}
