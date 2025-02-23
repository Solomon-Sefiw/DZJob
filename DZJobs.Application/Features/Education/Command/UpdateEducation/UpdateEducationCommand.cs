using MediatR;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;

namespace HCMS.Application.Educations.Commands
{
    public class UpdateEducationCommand : IRequest<int>
    {
        public int Id { get; set; }
        public EducationLevelEnum EducationLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SchoolName { get; set; }
        public string SchoolCity { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime GraduationDate { get; set; }
    }

    public class UpdateEducationCommandHandler : IRequestHandler<UpdateEducationCommand, int>
    {
        private readonly IDataService _context;

        public UpdateEducationCommandHandler(IDataService context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateEducationCommand request, CancellationToken cancellationToken)
        {
            var education = await _context.Educations.FindAsync(new object[] { request.Id }, cancellationToken);
            if (education == null)
                throw new KeyNotFoundException("Education record not found.");

            education.EducationLevel = request.EducationLevel;
            education.StartDate = request.StartDate;
            education.EndDate = request.EndDate;
            education.SchoolName = request.SchoolName;
            education.SchoolCity = request.SchoolCity;
            education.FieldOfStudy = request.FieldOfStudy;
            education.GraduationDate = request.GraduationDate;
            education.UpdatedAt = DateTime.UtcNow;

            _context.Educations.Update(education);
            await _context.SaveAsync(cancellationToken);

            return education.Id;
        }
    }
}
