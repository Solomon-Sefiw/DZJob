

using System.Collections.Generic;
using DZJobs.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Services.DataService
{
    public interface IDataService
    {
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<FreelancerProfile> FreelancerProfiles { get; set; }
        public DbSet<EmployerProfile> EmployerProfiles { get; set; }
        public DbSet<Skill>  Skills { get; set; }
        public DbSet<Education>  Educations { get; set; }
        public DbSet<Geolocation> Geolocations { get; set; }
        public DbSet<EmploymentHistory> EmploymentHistories { get; set; }

        void Save();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
