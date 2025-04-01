FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DZJobs.Application/DZJobs.Application.csproj", "DZJobs.Application/"]
COPY ["DZJobs/DZJobs.Api.csproj", "DZJobs/"]
COPY ["DZJobs.Domain/DZJobs.Domain.csproj", "DZJobs.Domain/"]
COPY ["DZJobs.Infrastructure/DZJobs.Infrastructure/DZJobs.Infrastructure.csproj", "DZJobs.Infrastructure/"]
COPY ["DZJobs.Persistance/DZJobs.Persistance.csproj", "DZJobs.Persistance/"]
RUN dotnet restore "DZJobs/DZJobs.Api.csproj"
COPY . .
WORKDIR "/src/DZJobs"
RUN dotnet publish "DZJobs.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "DZJobs.Api.dll"]
