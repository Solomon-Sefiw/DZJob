using HCMS.Api.Dto.Auth;
using HCMS.Api.Filters;
using HCMS.API.Controllers.DocumentController;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DZJobs.Controllers
{
    [ApiController]
    [ServiceFilter(typeof(ApiExceptionFilterAttribute))]
    public class BaseController<T> : ControllerBase where T : BaseController<T>
    {
        private IMediator? _mediator;
        private ILogger<T> _logger;
        private UserDto? _currentUser;
        private HttpContextAccessor _httpContextAccessor;
        protected IMediator mediator => _mediator ??=
             HttpContext.RequestServices.GetService<IMediator>();
        protected ILogger<T> logger => _logger ??=
            HttpContext.RequestServices.GetService<ILogger<T>>();
        public static string ShortName => typeof(T).Name.Replace("Controller", "");
        protected HttpContextAccessor httpContextAccessor => _httpContextAccessor ??=
       HttpContext.RequestServices.GetService<HttpContextAccessor>();

        protected string GetDocumentUrl(string documentId)
        {
            if (documentId == null) return null;

            return Url.Action(
                action: nameof(DocumentsController.Get),
                controller: DocumentsController.ShortName,
                values: new { Id = documentId.ToString() });
        }
        public UserDto CurrentUser => _currentUser ??= GetCurrentUser();
        private UserDto GetCurrentUser()
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var claims = httpContextAccessor.HttpContext.User.Claims;
                if (claims != null)
                {
                    return new UserDto
                    {
                        Id = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                        FirstName = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                        MiddleName = claims?.FirstOrDefault(c => c.Type == "middle_name")?.Value,
                        LastName = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value,
                        Email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                        BranchId = Convert.ToInt16(claims?.FirstOrDefault(c => c.Type == "branch_Id")?.Value),
                    };
                }
            }
            return null;
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