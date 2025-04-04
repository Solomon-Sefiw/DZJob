using DZJobs.Application;
using DZJobs.Infrastructure;
using DZJobs.Persistence.DBContext;
using HCMS.Api;
using HCMS.Api.Filters;
using HCMS.Api.Services;
using HCMS.Common;
using HCMS.Persistance.DBContext;
using Microsoft.AspNetCore.SignalR;
using SMS.Api.Configurations;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ 1. Configure CORS (MUST allow credentials for WebSockets)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()); // ✅ Required for SignalR WebSockets
});

// ✅ 2. Add services
builder.Services.AddControllers();
builder.Services.AddScoped<ApiExceptionFilterAttribute>();
builder.Services.AddScoped<IUserService, UserService>();

// ✅ 3. Add SignalR for real-time chat
builder.Services.AddSignalR();

// ✅ 4. Register application layers
builder.Services.AddEndpointsApiExplorer()
    .AddSwagger()
    .AddPersistenceService(builder.Configuration)
    .AddInfrastructureService(builder.Configuration)
    .AddApplicationServices()
    .AddScoped<HttpContextAccessor>();

var app = builder.Build();

// ✅ 5. Configure Middleware (ORDER MATTERS)
//Enable swagger in all environments.
app.UseSwagger();
app.UseSwaggerUI();

if (app.Environment.IsDevelopment())
{
    await DataSeeder.SeedData(app);
}

// ✅ CORS MUST COME BEFORE authentication and controllers!
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// ✅ 6. Register controllers & SignalR hubs
app.MapControllers();
app.MapHub<ChatHub>("/chatHub"); // ✅ Ensure this is correctly mapped

// ✅ 7. Seed Database (if needed)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DZJobsDBContext>();
    DZJobsDBContext.SeedData(context);
}

app.Run();

