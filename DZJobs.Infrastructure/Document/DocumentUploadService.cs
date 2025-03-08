﻿
using HCMS.Application.Contrats;
using HCMS.Domain.Document;
using HCMS.Services.DataService;
using Microsoft.AspNetCore.Http;

namespace HCMS.Infrastructure
{
    public class DocumentUploadService : IDocumentUploadService
    {
        private readonly IDataService dataService;

        public DocumentUploadService(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public Task Delete(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Document> Upload(IFormFile file, CancellationToken cancellationToken)
        {

            if (file.Length > 0)
            {
                byte[] content = null;
                await using var strem = file.OpenReadStream();
                using (var memoryStream = new MemoryStream())
                {
                    strem.CopyTo(memoryStream);
                    content = memoryStream.ToArray();
                }

                var document = new Document()
                {
                    Id = Guid.NewGuid().ToString(), // Assign a unique string ID
                    FileName = file.FileName,
                    Length = file.Length,
                    ContentDescription = file.ContentDisposition,
                    ContentType = file.ContentType,
                    Content = content
                };

                dataService.Documents.Add(document);
                await dataService.SaveAsync(cancellationToken);
                return document;
            }

            return null;
        }
    }
}