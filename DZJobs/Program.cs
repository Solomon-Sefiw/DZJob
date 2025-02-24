using DZJobs.Application;
using DZJobs.Infrastructure;
using DZJobs.Persistence.DBContext;
using HCMS.Persistance.DBContext;
using HCMS.Services.DataService;
using Microsoft.OpenApi.Models;
using SMS.Api.Configurations;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer()
    .AddSwagger()
    .AddPersistenceService(builder.Configuration)
    .AddInfrastructureService(builder.Configuration)
    .AddApplicationServices()
    .AddScoped<HttpContextAccessor>();
//builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DZJobsDBContext>();
    DZJobsDBContext.SeedData(context);
}
app.Run();

