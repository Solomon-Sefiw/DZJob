using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Domain.Entities;

namespace DZJobs.Application.Features.ContractPayment.Models
{
    public class ContractPaymentDto
    {
        public int Id { get; set; }
        public int MilestoneId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public PaymentStatus Status { get; set; }
        public string TransactionId { get; set; }
    }

}
