using System.Text;
using DZJobs.Domain.User;
using DZJobs.Persistence.DBContext;
using HCMS.Persistance.Interceptors;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SMS.Persistence.Interceptors;


namespace HCMS.Persistance.DBContext
{
    public static class PersistanceDBConnection
    {
        public static IServiceCollection AddPersistenceService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<PublishDomainEventsInterceptor>();
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();
            services.AddDbContext<DZJobsDBContext>(item => item.UseSqlServer(configuration.GetConnectionString("DZJobsConnectionString")));
            services.AddScoped<IDataService, DZJobsDBContext>();

            return services;
        }
    }
}
