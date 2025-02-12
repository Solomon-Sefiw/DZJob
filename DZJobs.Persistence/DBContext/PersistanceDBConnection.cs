using System.Text;
using DZJobs.Domain.User;
using DZJobs.Persistence.DBContext;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;


namespace HCMS.Persistance.DBContext
{
    public static class PersistanceDBConnection
    {
        public static IServiceCollection AddPersistenceService(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<DZJobsDBContext>(item => item.UseSqlServer(configuration.GetConnectionString("DZJobsConnectionString")));
            services.AddScoped<IDataService, DZJobsDBContext>();
            return services;
        }
    }
}
