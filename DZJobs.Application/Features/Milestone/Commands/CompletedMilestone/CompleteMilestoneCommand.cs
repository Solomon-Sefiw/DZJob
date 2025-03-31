//using DZJobs.Application.Interfaces;
//using DZJobs.Domain.Entities;
//using HCMS.Services.DataService;
//using MediatR;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Linq;
//using System.Threading;
//using System.Threading.Tasks;

//public class CompleteMilestoneCommand : IRequest<int>
//{
//    public int MilestoneId { get; set; }
//}

//public class CompleteMilestoneCommandHandler : IRequestHandler<CompleteMilestoneCommand, int>
//{
//    private readonly IDataService _context;
//    private readonly IBankService _bankService;

//    public CompleteMilestoneCommandHandler(IDataService context, IBankService bankService)
//    {
//        _context = context;
//        _bankService = bankService;
//    }

//    public async Task<int> Handle(CompleteMilestoneCommand request, CancellationToken cancellationToken)
//    {
//        var milestone = await _context.Milestones
//            .Include(m => m.Contract)
//            .FirstOrDefaultAsync(m => m.Id == request.MilestoneId, cancellationToken);

//        if (milestone == null)
//            throw new Exception("Milestone not found.");

//        if (milestone.Status == MilestoneStatus.Completed)
//            throw new Exception("Milestone is already completed.");

//        // ✅ Mark the milestone as completed
//        //milestone.Status = MilestoneStatus.Completed;
//        //await _context.SaveAsync(cancellationToken);

//        // ✅ Process payment with the real bank API
//        var payment = new ContractPayment
//        {
//            MilestoneId = milestone.Id,
//            EmployerId = milestone.Contract.EmployerId,
//            FreelancerId = milestone.Contract.FreelancerId,
//            Amount = milestone.Amount,
//            PaymentDate = DateTime.UtcNow,
//            Status = PaymentStatus.Pending,
//            TransactionId = string.Empty
//        };

//        _context.ContractPayments.Add(payment);
//        await _context.SaveAsync(cancellationToken);

//        var bankResponse = await _bankService.ProcessPaymentAsync(payment);

//        if (!bankResponse.Success)
//        {
//            payment.Status = PaymentStatus.Failed;
//            await _context.SaveAsync(cancellationToken);
//            throw new Exception("Payment failed: " + bankResponse.Message);
//        }

//        payment.TransactionId = bankResponse.TransactionId;
//        payment.Status = PaymentStatus.Completed;
//        await _context.SaveAsync(cancellationToken);
//        // ✅ Mark the milestone as completed                 moved from the above comment
//        milestone.Status = MilestoneStatus.Completed;
//        await _context.SaveAsync(cancellationToken);

//        // ✅ Check if all milestones are completed
//        bool allMilestonesCompleted = await _context.Milestones
//            .Where(m => m.ContractId == milestone.ContractId)
//            .AllAsync(m => m.Status == MilestoneStatus.Completed, cancellationToken);

//        if (allMilestonesCompleted)
//        {
//            var contract = await _context.Contracts
//                .FirstOrDefaultAsync(c => c.Id == milestone.ContractId, cancellationToken);

//            if (contract != null && contract.Status != ContractStatus.Completed)
//            {
//                contract.Status = ContractStatus.Completed;
//                await _context.SaveAsync(cancellationToken);
//            }
//        }

//        return milestone.Id;
//    }
//}



using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

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


