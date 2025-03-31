
using DZJobs.Persistence.DBContext;
using Microsoft.AspNetCore.Identity;



namespace DZJobs.Persistence.SeedData
{
    public class Seed
    {
  
        public static async Task SeedData (DZJobsDBContext context,UserManager <DZJobUser> userManager)
        {
            await context.SaveChangesAsync ();
        }
    }
}
