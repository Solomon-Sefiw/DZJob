using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DZJobs.Application.Models;

namespace DZJobs.Application.Interfaces
{
    public interface IBankService
    {
        Task<BankPaymentResponse> ProcessPaymentAsync(ContractPayment payment);
    }


}
