
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Persistance.DBContext
{
    public class HCMSDBContext : IdentityDbContext<HRUser, HRRole, string, IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>, IDataService
    {
        public HCMSDBContext(DbContextOptions<HCMSDBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(HCMSDBContext).Assembly);
            modelBuilder.HasSequence<int>("EmployeeId");
        }
        public DbSet<BusinessUnit> BusinessUnits { get; set; }

        public void Save()
        {
            this.SaveChanges();
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await SaveChangesAsync(cancellationToken);
        }
    }

}
