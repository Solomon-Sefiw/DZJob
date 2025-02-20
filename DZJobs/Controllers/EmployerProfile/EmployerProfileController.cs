using DZJobs.Application.Features.EmployerProfile.Queries.GetAllEmployerProfile;
using HCMS.API.Controllers;
using HCMS.Application.EmployerProfiles.Commands;
using HCMS.Application.EmployerProfiles.Models;
using HCMS.Application.EmployerProfiles.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.EmployerProfile
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerProfileController : BaseController<EmployerProfileController>
    {
        [HttpPost]
        public async Task<ActionResult<int>> CreateEmployerProfile([FromBody] CreateEmployerProfileCommand command)
        {
            int profileId = await mediator.Send(command);
            return Ok(profileId);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateEmployerProfile([FromBody] UpdateEmployerProfileCommand command)
        {
            int id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EmployerProfileDto>> GetEmployerProfileById(int id)
        {
            var profile = await mediator.Send(new GetEmployerProfileByIdQuery(id));
            return Ok(profile);
        }

        [HttpGet]
        public async Task<ActionResult<List<EmployerProfileDto>>> GetAllEmployerProfiles()
        {
            var profiles = await mediator.Send(new GetAllEmployerProfilesQuery());
            return Ok(profiles);
        }
    }
}
