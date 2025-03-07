using System.Text;
using DZJobs.Domain.User;
using DZJobs.Persistence.DBContext;
using HCMS.Application.Contrats;
using HCMS.Infrastructure;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using User.Managment.Service.Models;
using User.Managment.Service.Repository;
using User.Managment.Service.Services;


namespace DZJobs.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IEmailServices, EmailServices>();
        services.AddScoped<IDocumentUploadService, DocumentUploadService>();
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        });
        services.Configure<IdentityOptions>(opts => opts.SignIn.RequireConfirmedEmail = true);


        services.AddIdentity<DZJobUser, IdentityRole>(options =>
        {
            //options.Password.RequireDigit = false; // No numeric requirement
            //  options.Password.RequireLowercase = false; // No lowercase requirement
            options.Password.RequireUppercase = false; // No uppercase requirement
            options.Password.RequireNonAlphanumeric = false; // No special character requirement
            options.Password.RequiredLength = 6; // Minimum password length
            options.Password.RequiredUniqueChars = 0; // No unique character requirement
        })
           .AddEntityFrameworkStores<DZJobsDBContext>()
           .AddDefaultTokenProviders();
        services.Configure<DataProtectionTokenProviderOptions>(opt =>
        opt.TokenLifespan = TimeSpan.FromHours(10));
        // Adding Authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = configuration["JWT:ValidAudience"],
                ValidIssuer = configuration["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
            };
        });
        // Email Configs
        var emailConfig = configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
        services.AddSingleton(emailConfig);

        // Config for Required Email
        services.Configure<IdentityOptions>(
            opts => opts.SignIn.RequireConfirmedEmail = true);

        //services.AddAuthorization(options =>
        //{
        //    //Allocation
        //    options.AddPolicy(AuthPolicy.CanApproveAllocation, policy => policy.RequireRole(Roles.ShareUnitDirector));
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateAllocation, policy => policy.RequireRole(Roles.ShareUnitSectionHead));
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateBankAllocation, policy => policy.RequireRole(Roles.ShareUnitSectionHead));
        //    options.AddPolicy(AuthPolicy.CanApproveBankAllocation, policy => policy.RequireRole(Roles.ShareUnitDirector));

        //    //Dividend Setup
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateDividendSetup, policy => policy.RequireRole(Roles.ShareUnitSectionHead, Roles.ShareUnitDirector));
        //    options.AddPolicy(AuthPolicy.CanApproveDividendSetup, policy => policy.RequireRole(Roles.ShareUnitDirector, Roles.ShareUnitSectionHead));

        //    //ParValue
        //    options.AddPolicy(AuthPolicy.CanApproveParValue, policy => policy.RequireRole(Roles.ShareUnitDirector, Roles.ShareUnitSectionHead));
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateParValue, policy => policy.RequireRole(Roles.ShareUnitDirector, Roles.ShareUnitSectionHead));

        //    //Subscription Group
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateSubscriptionGroup, policy => policy.RequireRole(Roles.ShareUnitDirector, Roles.ShareUnitSectionHead));

        //    //Shareholder
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateShareholderInfo, policy => policy.RequireRole(Roles.ShareOfficer));
        //    options.AddPolicy(AuthPolicy.CanSubmitShareholderApprovalRequest, policy => policy.RequireRole(Roles.ShareOfficer));
        //    options.AddPolicy(AuthPolicy.CanApproveShareholder, policy => policy.RequireRole(Roles.ShareUnitDirector, Roles.ShareUnitSectionHead));

        //    //Subscription
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateSubscription, policy => policy.RequireRole(Roles.ShareOfficer));

        //    //Payment
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdatePayment, policy => policy.RequireRole(Roles.ShareOfficer));

        //    //Transfer
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateTransfer, policy => policy.RequireRole(Roles.ShareOfficer));

        //    //admin
        //    options.AddPolicy(AuthPolicy.CanCreateOrUpdateUser, policy => policy.RequireRole(Roles.ITAdmin));

        //    //endofday
        //    options.AddPolicy(AuthPolicy.CanProcessEndOfDay, policy => policy.RequireRole(Roles.ShareUnitSectionHead, Roles.ITAdmin));
        //});

        return services;
    }
}
