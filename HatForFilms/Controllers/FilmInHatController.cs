using Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Classes;
using Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HatForFilms.Controllers
{
    [Route("api/FiH")]
    [ApiController]
    public class FilmInHatController : ControllerBase
    {
        FilmInHatRepository filmInHatRepository = new FilmInHatRepository();

        [HttpPost]
        [Route("addNew")]
        public void addNew([FromHeader] int Id, [FromHeader] string token, 
            [FromQuery]int hatId, [FromQuery]int filmId)
        {
            if (!IdentifyUser.isValid(Id, token))
            {
                return;
            }

            var film = new FilmInHat()
            {
                filmId = filmId,
                hatId = hatId,
                adderId = Id
            };

            filmInHatRepository.CreateNewSub(film);
        }
    }
}
