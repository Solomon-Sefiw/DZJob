﻿using HCMS.Application.Contrats;
using HCMS.Domain.Document;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DZJobs.Application.Features.Documents.Commands
{
    public class AddDocumentCommand : IRequest<Document>
    {
        public IFormFile File { get; set; }
    }

    internal class AddDocumentCommandHandler : IRequestHandler<AddDocumentCommand, Document>
    {
        private readonly IDocumentUploadService documentUploadService;

        public AddDocumentCommandHandler(IDocumentUploadService documentUploadService)
        {
            this.documentUploadService = documentUploadService;
        }


        public async Task<Document> Handle(AddDocumentCommand request, CancellationToken cancellationToken)
        {
            return await documentUploadService.Upload(request.File, cancellationToken);
        }
    }
}