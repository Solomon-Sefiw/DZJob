using HCMS.Application.Geolocations.Commands;
using HCMS.Application.Geolocations.Models;
using HCMS.Application.Geolocations.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DZJobs.Controllers.Geolocation
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeolocationController : BaseController<GeolocationController>
    {

        [HttpPost]
        public async Task<ActionResult<int>> CreateGeolocation([FromBody] CreateGeolocationCommand command)
        {
            int id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateGeolocation([FromBody] UpdateGeolocationCommand command)
        {
            int id = await mediator.Send(command);
            return Ok(id);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<GeolocationDto>> GetGeolocationById(int id)
        {
            var geolocation = await mediator.Send(new GetGeolocationByIdQuery(id));
            return Ok(geolocation);
        }

        [HttpGet]
        public async Task<ActionResult<List<GeolocationDto>>> GetAllGeolocations()
        {
            var geolocations = await mediator.Send(new GetAllGeolocationsQuery());
            return Ok(geolocations);
        }
    }
}
