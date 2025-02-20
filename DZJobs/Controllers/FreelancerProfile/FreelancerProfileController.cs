using DZJobs.Application.Features.FreelancerProfile.Models;
using HCMS.API.Controllers;
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


        [HttpPost]
        public async Task<ActionResult<int>> CreateFreelancerProfile([FromBody] CreateFreelancerProfileCommand command)
        {
            var id = await mediator.Send(command);
            return CreatedAtAction(nameof(GetFreelancerProfileById), new { id }, id);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<FreelancerProfileDto>> GetFreelancerProfileById(int id)
        {
            var profile = await mediator.Send(new GetFreelancerProfileByIdQuery(id));
            return Ok(profile);
        }

        [HttpGet]
        public async Task<ActionResult<List<FreelancerProfileDto>>> GetAllFreelancerProfiles()
        {
            var profiles = await mediator.Send(new GetAllFreelancerProfilesQuery());
            return Ok(profiles);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateFreelancerProfile([FromBody] UpdateFreelancerProfileCommand command)
        {
            var profileId = await mediator.Send(command);
            return profileId;
        }

    }
}
