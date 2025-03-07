using HCMS.API.Controllers.DocumentController;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HCMS.API.Controllers
{
    [ApiController]

    public class BaseController<T> :ControllerBase where T : BaseController<T>
    {
        private IMediator? _mediator;
        private ILogger<T> _logger;
        public static string ShortName => typeof(T).Name.Replace("Controller", "");
        protected IMediator mediator => _mediator ??=
             HttpContext.RequestServices.GetService<IMediator>();
        protected ILogger<T> logger => _logger ??=
            HttpContext.RequestServices.GetService<ILogger<T>>();




        protected string GetDocumentUrl(string documentId)
        {
            if (documentId == null) return null;

            return Url.Action(
                action: nameof(DocumentsController.Get),
                controller: DocumentsController.ShortName,
                values: new { Id = documentId.ToString() });
        }

        protected string GetDocumentRootPath()
        {
            return Url.Action(
                action: nameof(DocumentsController.Get),
                controller: DocumentsController.ShortName,
                values: new { Id = string.Empty });
        }
    }
}
