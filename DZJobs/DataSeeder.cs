
using DZJobs.Persistence.DBContext;
using HCMS.Persistance.SeedData;
using Microsoft.AspNetCore.Identity;

namespace HCMS.Api
{
    public static class DataSeeder
    {
        public static async Task<WebApplication> SeedData(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                using (var context = scope.ServiceProvider.GetRequiredService<DZJobsDBContext>())
                {
                    try
                    {
                        var userManager = services.GetRequiredService<UserManager<DZJobUser>>();
                        //var roleManager = services.GetRequiredService<RoleManager<HRRole>>();
                        await Seed.SeedData(context, userManager);
                    }
                    catch (Exception ex)
                    {
                        var logger = services.GetRequiredService<ILogger<DZJobsDBContext>>();
                        logger.LogError(ex, "Error occurred  during migration");
                        throw;
                    }
                }
            }
            return app;
        }
    }
}