using Microsoft.EntityFrameworkCore;
using HCMS.Application.Educations.Models;
using HCMS.Services.DataService;
using MediatR;


namespace DZJobs.Application.Features.Education.Queries.GetEducationById
{
    // Query Definition
    public class GetEducationByUserIdQuery : IRequest<List<EducationDto>>
    {
        public string UserId { get; }

        public GetEducationByUserIdQuery(string userId) => UserId = userId;
    }

    // Query Handler
    public class GetEducationByUserIdQueryHandler : IRequestHandler<GetEducationByUserIdQuery, List<EducationDto>>
    {
        private readonly IDataService _context;

        public GetEducationByUserIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<EducationDto>> Handle(GetEducationByUserIdQuery request, CancellationToken cancellationToken)
        {
            var educationList = await _context.Educations
                .AsNoTracking()
                .Where(e => e.UserId == request.UserId)
                .Select(e => new EducationDto
                {
                    Id = e.Id,
                    UserId = e.UserId,
                    EducationLevel = e.EducationLevel,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    SchoolName = e.SchoolName,
                    SchoolCity = e.SchoolCity,
                    FieldOfStudy = e.FieldOfStudy,
                    GraduationDate = e.GraduationDate
                })
                .ToListAsync(cancellationToken);

            return educationList; // Returns an empty list if no records are found
        }
    }
}
