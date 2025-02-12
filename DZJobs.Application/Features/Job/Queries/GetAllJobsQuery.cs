using DZJobs.Application.Jobs.DTOs;
using MediatR;
using System.Collections.Generic;

namespace DZJobs.Application.Jobs.Queries
{
    public class GetAllJobsQuery : IRequest<List<JobDto>> { }
}
