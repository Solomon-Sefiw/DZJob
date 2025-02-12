using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using User.Managment.Service.Models;

namespace User.Managment.Service.Services
{
    public interface IEmailServices
    {
        void SendEmail(EmailContent message);
    }
}
