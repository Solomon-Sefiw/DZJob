

using System.Reflection.Emit;
using DZJobs.Domain.Entities;
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

            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Employer) // Navigation property in Contract
                        .WithMany(u => u.Contracts) // Navigation property in DZJobUser
                        .HasForeignKey(c => c.EmployerId); // Foreign key in Contract
            modelBuilder.Entity<Message>()
                        .HasOne(m => m.Sender) // Navigation property in Message
                        .WithMany(u => u.Messages) // Navigation property in DZJobUser
                        .HasForeignKey(m => m.SenderId) // Foreign key in Message

                        .OnDelete(DeleteBehavior.Restrict); // Optional: Set delete behavior

            modelBuilder.Entity<Message>()
                        .HasOne(m => m.Receiver)
                        .WithMany() // You can add a collection to DZJobUser for received messages if needed
                        .HasForeignKey(m => m.ReceiverId)
                        .OnDelete(DeleteBehavior.Restrict); // Optional: Set delete behavior

            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Employer)
                        .WithMany(u => u.Contracts)
                        .HasForeignKey(c => c.EmployerId)
                        .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Freelancer)
                        .WithMany() // You can define this if JobSeeker has Contracts
                        .HasForeignKey(c => c.FreelancerId)
                        .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            modelBuilder.Entity<UserSkill>()
                        .HasKey(us => us.Id);

            modelBuilder.Entity<UserSkill>()
                        .HasOne(us => us.User)
                        .WithMany(u => u.UserSkills)
                        .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<UserSkill>()
                        .HasOne(us => us.Skill)
                        .WithMany(s => s.UserSkills)
                        .HasForeignKey(us => us.SkillId);
        }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<FreelancerProfile> FreelancerProfiles { get; set; }
        public DbSet<EmployerProfile> EmployerProfiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Geolocation> Geolocations { get; set; }
        public DbSet<EmploymentHistory> EmploymentHistories { get; set; }

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


