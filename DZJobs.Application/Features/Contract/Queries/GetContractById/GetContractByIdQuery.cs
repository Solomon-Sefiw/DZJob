using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Queries.GetContractById
{

    public record GetContractByIdQuery(int Id) : IRequest<ContractDto>;

    public class GetContractByIdQueryHandler : IRequestHandler<GetContractByIdQuery, ContractDto>
    {
        private readonly IDataService _context;

        public GetContractByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<ContractDto> Handle(GetContractByIdQuery request, CancellationToken cancellationToken)
        {
            var contract = await _context.Contracts
                .Include(c => c.Job)
                .Include(c => c.Freelancer)
                .Include(c => c.Employer)
                .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (contract == null)
                throw new NotFoundException(nameof(Contract), request.Id);

            return new ContractDto
            {
                Id = contract.Id,
                JobId = contract.JobId,
                FreelancerId = contract.FreelancerId,
                EmployerId = contract.EmployerId,
                AgreedAmount = contract.AgreedAmount,
                StartDate = contract.StartDate,
                EndDate = contract.EndDate,
                Status = contract.Status
            };
        }
    }

}
