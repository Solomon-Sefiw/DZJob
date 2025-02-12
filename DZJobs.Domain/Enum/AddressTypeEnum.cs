using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Domain.Enum
{
    public enum AddressTypeEnum
    {
        BusinessUnitAddress = 1,
        BirthPlaceAddress = 2,
        CurrentAddress = 3,
        EmergencyContactAddress = 4, 
        ParentAddress=8,//pevious 4
        SpouseAddress=5,//previous 5
        EmployeeGuaranter=6,
        WorkingFirmAddress=7,
        GuaranterWorkingFirmAddress=9,
    }
}
