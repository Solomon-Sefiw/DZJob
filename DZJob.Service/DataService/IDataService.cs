using HCMS.Domain.BusinessUnit;
using HCMS.Domain.EmailTemplet;
using HCMS.Domain;
using HCMS.Domain.Job;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Services.DataService
{
    public interface IDataService
    {
        public DbSet<BusinessUnit> BusinessUnits { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<JobGrade> JobGrades { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }
        public DbSet<JobCatagory> JobCatagories { get; set; }
        public DbSet<BusinessUnitType> BusinessUnitTypes { get; set; }
        void Save();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
