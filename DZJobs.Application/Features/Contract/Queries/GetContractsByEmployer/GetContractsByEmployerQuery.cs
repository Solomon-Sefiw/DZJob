using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DZJobs.Application.Features.Contract.Queries.GetContractsByFreelancer;
using DZJobs.Domain.Entities;
using HCMS.Application.Exceptions;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Contract.Queries.GetContractsByEmployer
{

  
    public record GetContractsByEmployerQuery(ContractStatus Status, string EmployerId, int PageNumber, int PageSize) : IRequest<ContractSearchResult>;
    public class GetContractsByEmployerQueryHandler : IRequestHandler<GetContractsByEmployerQuery, ContractSearchResult>
    {
        private readonly IMapper mapper;
        private readonly IDataService dataService;
        public GetContractsByEmployerQueryHandler(IMapper mapper, IDataService dataService)
        {
            this.mapper = mapper;
            this.dataService = dataService;
        }
        public async Task<ContractSearchResult> Handle(GetContractsByEmployerQuery request, CancellationToken cancellationToken)
        {
            var contracts = await dataService.Contracts
                       .Include(c => c.Job)
                        .Include(c => c.Freelancer)
                        .Include(c => c.Employer)
                        .Where(c => c.EmployerId == request.EmployerId)
                        .ToListAsync(cancellationToken);

            var contractlist = contracts.Select(contract => new ContractDto
            {
                Id = contract.Id,
                JobId = contract.JobId,
                JobTitle = contract.Job.Title,
                FreelancerId = contract.FreelancerId,
                Freelancer = contract.Freelancer.FirstName +" "+ contract.Freelancer.LastName,
                EmployerId = contract.EmployerId,
                Employer = contract.Employer.FirstName + " " + contract.Employer.LastName,
                AgreedAmount = contract.AgreedAmount,
                StartDate = contract.StartDate,
                EndDate = contract.EndDate,
                Status = contract.Status
            }).ToList();
            if (request.Status == ContractStatus.Draft)
            {
                var result = contractlist.Where(JR => JR.Status == ContractStatus.Draft)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Contracts.Where(JR => JR.Status == ContractStatus.Draft).CountAsync();
                return new(result, count);
            }
            else if (request.Status == ContractStatus.Pending)
            {
                var result = contractlist.Where(JR => JR.Status == ContractStatus.Pending)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Contracts.Where(JR => JR.Status == ContractStatus.Pending).CountAsync();
                return new(result, count);
            }
            else if (request.Status == ContractStatus.Active)
            {
                var result = contractlist.Where(JR => JR.Status == ContractStatus.Active)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Contracts.Where(JR => JR.Status == ContractStatus.Active).CountAsync();
                return new(result, count);
            }
            else if (request.Status == ContractStatus.Completed)
            {
                var result = contractlist.Where(JR => JR.Status == ContractStatus.Completed)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Contracts.Where(JR => JR.Status == ContractStatus.Completed).CountAsync();
                return new(result, count);
            }
            else if (request.Status == ContractStatus.Terminated)
            {
                var result = contractlist.Where(JR => JR.Status == ContractStatus.Terminated)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Contracts.Where(JR => JR.Status == ContractStatus.Terminated).CountAsync();
                return new(result, count);
            }
            else
            {
                var result = contractlist.Where(JR => JR.Status == ContractStatus.Disputed)
                                                .Skip((request.PageNumber - 1) * request.PageSize)
                                                .Take(request.PageSize)
                                                .ToList();

                var count = await dataService.
                    Contracts.Where(JR => JR.Status == ContractStatus.Disputed).CountAsync();
                return new(result, count);
            }
        }
    }

}
