using DZJobs.Application;
using DZJobs.Infrastructure;
using DZJobs.Persistence.DBContext;
using HCMS.Api;
using HCMS.Api.Filters;
using HCMS.Api.Services;
using HCMS.Common;
using HCMS.Persistance.DBContext;
using SMS.Api.Configurations;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add Frontend CORS Permissions and Config
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// ✅ Add services to the container
builder.Services.AddControllers();
builder.Services.AddScoped<ApiExceptionFilterAttribute>();
builder.Services.AddScoped<IUserService, UserService>();

// ✅ Add SignalR for real-time messaging
builder.Services.AddSignalR();

// ✅ Register Other Services (Swagger, Database, Application Layer)
builder.Services.AddEndpointsApiExplorer()
    .AddSwagger()
    .AddPersistenceService(builder.Configuration)
    .AddInfrastructureService(builder.Configuration)
    .AddApplicationServices()
    .AddScoped<HttpContextAccessor>();

var app = builder.Build();

// ✅ Configure Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    await DataSeeder.SeedData(app);
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// ✅ Map SignalR Hub for Real-time Chat
app.MapHub<ChatHub>("/chatHub"); // 🔥 Now clients can connect to /chatHub

// ✅ Seed Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DZJobsDBContext>();
    DZJobsDBContext.SeedData(context);
}

app.Run();
