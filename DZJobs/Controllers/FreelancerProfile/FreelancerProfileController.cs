using DZJobs.Application.Features.FreelancerProfile.Models;
using HCMS.Application.FreelancerProfiles.Commands;
using HCMS.Application.FreelancerProfiles.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.FreelancerProfile
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreelancerProfileController : BaseController<FreelancerProfileController>
    {


        [HttpPost("Create", Name = "CreateFreelancerProfile")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> CreateFreelancerProfile([FromBody] CreateFreelancerProfileCommand command)
        {
            var id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpGet("getById{id:int}", Name = "GetFreelancerProfileById")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<FreelancerProfileDto>> GetFreelancerProfileById(int id)
        {
            var profile = await mediator.Send(new GetFreelancerProfileByIdQuery(id));
            return Ok(profile);
        }

        [HttpGet("all", Name = "GetAllFreelancerProfiles")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<FreelancerProfileDto>>> GetAllFreelancerProfiles()
        {
            var profiles = await mediator.Send(new GetAllFreelancerProfilesQuery());
            return Ok(profiles);
        }

        [HttpPut("update", Name = "UpdateFreelancerProfile")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateFreelancerProfile([FromBody] UpdateFreelancerProfileCommand command)
        {
            var profileId = await mediator.Send(command);
            return profileId;
        }

    }
}
