using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Queries.GetContractsCountByEmployer
{

    public record GetContractsCountByEmployerQuery(string EmployerId) : IRequest<ContractCountsByStatus>;
    public record ContractCountsByStatus(int draft,int pending, int active, int completed, int terminated, int disputed);

    public class GetContractsCountByEmployerQueryHandler : IRequestHandler<GetContractsCountByEmployerQuery, ContractCountsByStatus>
    {
        private readonly IDataService dataService;

        public GetContractsCountByEmployerQueryHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<ContractCountsByStatus> Handle(GetContractsCountByEmployerQuery request, CancellationToken cancellationToken)
        {
            var draft = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Draft && JR.EmployerId == request.EmployerId).CountAsync();
            var pending = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Pending && JR.EmployerId == request.EmployerId).CountAsync();
            var active = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Active && JR.EmployerId == request.EmployerId).CountAsync();
            var completed = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Completed && JR.EmployerId == request.EmployerId).CountAsync();
            var terminated = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Terminated && JR.EmployerId == request.EmployerId).CountAsync();
            var disputed = await dataService.Contracts.Where(JR => JR.Status == ContractStatus.Disputed && JR.EmployerId == request.EmployerId).CountAsync();

            return new(draft, pending,active,completed,terminated,disputed);
        }
    }
}
//    Draft = 0,
//    Pending = 1,      // Contract is created but not yet signed by both parties
//    Active = 2,       // Both freelancer and employer have agreed, and work has started
//    Completed = 3,    // All milestones are completed, and the contract is successfully finished
//    Terminated = 4,    // Contract was canceled before completion
//    Disputed = 5