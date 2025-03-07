using HCMS.Domain.Document;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Application.Features.Documents.Query;

public record GetDocumentQuery(string Id) : IRequest<Document?>;


internal class GetDocumentQueryHandler : IRequestHandler<GetDocumentQuery, Document?>
{
    private readonly IDataService dataService;

    public GetDocumentQueryHandler(IDataService dataService)
    {
        this.dataService = dataService;
    }


    public async Task<Document?> Handle(GetDocumentQuery request, CancellationToken cancellationToken)
    {
        return await dataService.Documents
            .Where(doc => doc.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }
}