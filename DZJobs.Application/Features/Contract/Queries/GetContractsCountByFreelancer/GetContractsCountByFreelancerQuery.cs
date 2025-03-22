using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Queries.GetContractsCountByFreelancer
{
    public record GetContractsCountByFreelancerQuery(string FreelancerId) : IRequest<ContractCountsByFreelancer>;
    public record ContractCountsByFreelancer(int draft, int pending, int active, int completed, int terminated, int disputed);

    public class GetContractsCountByEmployerQueryHandler : IRequestHandler<GetContractsCountByFreelancerQuery, ContractCountsByFreelancer>
    {
        private readonly IDataService dataService;

        public GetContractsCountByEmployerQueryHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<ContractCountsByFreelancer> Handle(GetContractsCountByFreelancerQuery request, CancellationToken cancellationToken)
        {
            var draft = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Draft && JR.FreelancerId == request.FreelancerId).CountAsync();
            var pending = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Pending && JR.FreelancerId == request.FreelancerId).CountAsync();
            var active = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Active && JR.FreelancerId == request.FreelancerId).CountAsync();
            var completed = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Completed && JR.FreelancerId == request.FreelancerId).CountAsync();
            var terminated = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Terminated && JR.FreelancerId == request.FreelancerId).CountAsync();
            var disputed = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Disputed && JR.FreelancerId == request.FreelancerId).CountAsync();

            return new(draft, pending, active, completed, terminated, disputed);
        }
    }
}
