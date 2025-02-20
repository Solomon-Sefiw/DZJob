using MediatR;
using Microsoft.EntityFrameworkCore;
using HCMS.Application.Educations.Models;
using HCMS.Services.DataService;

namespace HCMS.Application.Educations.Queries
{
    public class GetEducationByIdQuery : IRequest<EducationDto>
    {
        public int Id { get; set; }
        public GetEducationByIdQuery(int id) => Id = id;
    }

    public class GetEducationByIdQueryHandler : IRequestHandler<GetEducationByIdQuery, EducationDto>
    {
        private readonly IDataService _context;

        public GetEducationByIdQueryHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<EducationDto> Handle(GetEducationByIdQuery request, CancellationToken cancellationToken)
        {
            var education = await _context.Educations
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

            if (education == null)
                throw new KeyNotFoundException("Education record not found.");

            return new EducationDto
            {
                Id = education.Id,
                UserId = education.UserId,
                EducationLevel = education.EducationLevel.ToString(),
                StartDate = education.StartDate,
                EndDate = education.EndDate,
                SchoolName = education.SchoolName,
                SchoolCity = education.SchoolCity,
                FieldOfStudy = education.FieldOfStudy,
                GraduationDate = education.GraduationDate
            };
        }
    }
}
