using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TownController : ControllerBase
    {
        private readonly ITownService _townServices;
        public TownController(ITownService townService)
        {
            _townServices = townService;
        }

        // GET: api/<SettlementController>
        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            var list = await _townServices.GetAllTownsAsync();
            return Ok(list);
        }

        // GET api/<SettlementController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAsync(int id)
        {
            var getTown = await _townServices.GetTownByIdAsync(id);
            return Ok(getTown);
        }

        // POST api/<SettlementController>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] Town town)
        {
            var postTown = await _townServices.AddAsync(town);
            return Ok(postTown);
        }

        // PUT api/<SettlementController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Town town)
        {
            var putTown = await _townServices.UpdateAsync(id, town);
            return Ok(putTown);
        }

        // DELETE api/<SettlementController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var town = await _townServices.GetTownByIdAsync(id);
            if (town == null)
            {
                return NotFound();
            }
            await _townServices.DeleteAsync(id);
            return NoContent();
        }
    }
}
