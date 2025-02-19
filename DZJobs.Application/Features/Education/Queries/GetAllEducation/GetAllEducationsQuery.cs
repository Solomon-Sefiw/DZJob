using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Application.Educations.Models;
using HCMS.Services.DataService;

namespace HCMS.Application.Educations.Queries
{
    public class GetAllEducationsQuery : IRequest<List<EducationDto>> { }

    public class GetAllEducationsQueryHandler : IRequestHandler<GetAllEducationsQuery, List<EducationDto>>
    {
        private readonly IDataService _context;

        public GetAllEducationsQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<List<EducationDto>> Handle(GetAllEducationsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Educations
                .AsNoTracking()
                .Select(e => new EducationDto
                {
                    Id = e.Id,
                    UserId = e.UserId,
                    EducationLevel = e.EducationLevel.ToString(),
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    SchoolName = e.SchoolName,
                    SchoolCity = e.SchoolCity,
                    FieldOfStudy = e.FieldOfStudy,
                    GraduationDate = e.GraduationDate
                })
                .ToListAsync(cancellationToken);
        }
    }
}
