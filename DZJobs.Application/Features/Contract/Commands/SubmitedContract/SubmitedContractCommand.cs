using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;

namespace DZJobs.Application.Features.Contract.Commands.SubmitedContract
{

    public class SubmitContractCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

    public class SubmitContractCommandHandler : IRequestHandler<SubmitContractCommand, int>
    {
        private readonly IDataService _context;

        public SubmitContractCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(SubmitContractCommand request, CancellationToken cancellationToken)
        {
            var contract = await _context.Contracts.FindAsync(request.Id);
            contract.Status = ContractStatus.Pending;
            await _context.SaveAsync(cancellationToken);
            return contract.Id;
        }
    }

}
