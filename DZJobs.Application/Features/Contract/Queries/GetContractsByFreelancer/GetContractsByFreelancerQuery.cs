using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Queries.GetContractsByFreelancer
{
    public record GetContractsByFreelancerQuery(string FreelancerId) : IRequest<List<ContractDto>>;
    public class GetContractsByFreelancerQueryHandler : IRequestHandler<GetContractsByFreelancerQuery, List<ContractDto>>
    {
        private readonly IDataService _context;

        public GetContractsByFreelancerQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<ContractDto>> Handle(GetContractsByFreelancerQuery request, CancellationToken cancellationToken)
        {
            var contracts = await _context.Contracts
                .Where(c => c.FreelancerId == request.FreelancerId)
                .Include(c => c.Job)
                .Include(c => c.Employer)
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
                throw new NotFoundException(nameof(Contract), "No contracts found for this freelancer.");

            return contracts;
        }
    }

}
