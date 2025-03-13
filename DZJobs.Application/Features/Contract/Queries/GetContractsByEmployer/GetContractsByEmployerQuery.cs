using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Queries.GetContractsByEmployer
{
    public record GetContractsByEmployerQuery(string EmployerId) : IRequest<List<ContractDto>>;
    public class GetContractsByEmployerQueryHandler : IRequestHandler<GetContractsByEmployerQuery, List<ContractDto>>
    {
        private readonly IDataService _context;

        public GetContractsByEmployerQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<ContractDto>> Handle(GetContractsByEmployerQuery request, CancellationToken cancellationToken)
        {
            var contracts = await _context.Contracts
                .Where(c => c.EmployerId == request.EmployerId)
                .Include(c => c.Job)
                .Include(c => c.Freelancer)
                .Select(c => new ContractDto
                {
                    Id = c.Id,
                    JobId = c.JobId,
                    FreelancerId = c.FreelancerId,
                    EmployerId = c.EmployerId,
                    AgreedAmount = c.AgreedAmount,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    Status = c.Status
                })
                .ToListAsync(cancellationToken);

            if (contracts == null || contracts.Count == 0)
                throw new NotFoundException(nameof(Contract), "No contracts found for this employer.");

            return contracts;
        }
    }

}
