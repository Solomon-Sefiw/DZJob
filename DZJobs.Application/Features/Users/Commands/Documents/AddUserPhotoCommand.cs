using DZJobs.Application.Features.Documents.Commands;
using DZJobs.Domain.Entities;
using HCMS.Domain.Document;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace DZJobs.Application.Features.Users.Commands.Documents
{
    public record AddUserPhotoCommand(string UserId, IFormFile File) : IRequest<Document>;

    public class AddUserPhotoCommandHandler : IRequestHandler<AddUserPhotoCommand, Document>
    {
        private readonly IDataService dataService;
        private readonly IMediator mediator;

        public AddUserPhotoCommandHandler(IDataService dataService, IMediator mediator)
        {
            this.dataService = dataService;
            this.mediator = mediator;
        }

        public async Task<Document> Handle(AddUserPhotoCommand request, CancellationToken cancellationToken)
        {
            var document = await mediator.Send(new AddDocumentCommand()
            {
                File = request.File
            });

            var currentPhoto = await dataService.UserDocuments
                .Where(sd => sd.userId == request.UserId &&
                sd.DocumentType == DocumentType.EmployeePicture).ToListAsync();

            dataService.UserDocuments.RemoveRange(currentPhoto);

            dataService.UserDocuments.Add(new UserDocument()
            {
                userId = request.UserId,
                DocumentType = DocumentType.EmployeePicture,
                DocumentId = document.Id,
                FileName = document.FileName
            });

            await dataService.SaveAsync(cancellationToken);

            return document;
        }
    }
}