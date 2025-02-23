using MediatR;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;        // For EducationLevelEnum

namespace HCMS.Application.Educations.Commands
{
    public class CreateEducationCommand : IRequest<int>
    {
        public string UserId { get; set; }
        public EducationLevelEnum EducationLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SchoolName { get; set; }
        public string SchoolCity { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime GraduationDate { get; set; }
    }

    public class CreateEducationCommandHandler : IRequestHandler<CreateEducationCommand, int>
    {
        private readonly IDataService _context;

        public CreateEducationCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateEducationCommand request, CancellationToken cancellationToken)
        {
            var education = new Education
            {
                UserId = request.UserId,
                EducationLevel = request.EducationLevel,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                SchoolName = request.SchoolName,
                SchoolCity = request.SchoolCity,
                FieldOfStudy = request.FieldOfStudy,
                GraduationDate = request.GraduationDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Educations.Add(education);
            await _context.SaveAsync(cancellationToken);

            return education.Id;
        }
    }
}
