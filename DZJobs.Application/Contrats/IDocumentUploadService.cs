using HCMS.Domain.Document;
using Microsoft.AspNetCore.Http;

namespace HCMS.Application.Contrats
{
    public interface IDocumentUploadService
    {
        Task<Document> Upload(IFormFile file, CancellationToken cancellationToken);
        Task Delete(int id, CancellationToken cancellationToken);
    }
}
