

using System.Reflection.Emit;
using DZJobs.Domain.User;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Persistence.DBContext
{
    public class DZJobsDBContext : IdentityDbContext<DZJobUser>, IDataService
    {
        public DZJobsDBContext(DbContextOptions<DZJobsDBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Job)  // Assuming 'Job' navigation exists in Contract
                        .WithMany(j => j.Contracts)
                        .HasForeignKey(c => c.JobId)
                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Review>()
                        .HasOne(c => c.Job)  // Assuming 'Job' navigation exists in Contract
                        .WithMany(j => j.Reviews)
                        .HasForeignKey(c => c.JobId)
                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<JobApplication>()
                        .HasOne(c => c.Job)  // Assuming 'Job' navigation exists in Contract
                        .WithMany(j => j.Applications)
                        .HasForeignKey(c => c.JobId)
                        .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Job> Jobs { get; set; }

        public void Save()
        {
            SaveChanges();
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await SaveChangesAsync(cancellationToken);
        }
    }
}


