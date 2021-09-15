﻿using Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Classes;
using Models.Data;
using Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HatForFilms.Controllers
{
    [Route("api/Films")]
    [ApiController]
    public class FilmController : ControllerBase
    {
        FilmRepository Films = new FilmRepository();

        [HttpGet]
        [Route("Find")]
        public List<Film> FindByName([FromQuery] string filmName)
        {
            var res = Films.GetAll().Where(x=>x.Name.ToLower().Contains(filmName.ToLower())).ToList();
            return res;
        }

        [HttpGet]
        [Route("GetAll")]
        public List<Film> GetAllFilms()
        {
            return Films.GetAll();
        }

        [HttpPost]
        [Route("AddNew")]
        public ActionResult AddFilm([FromHeader] int Id, [FromHeader] string token, [FromQuery] string filmName)
        {
            if (!IdentifyUser.isValid(Id, token))
            {
                return null;
            }

            if (string.IsNullOrEmpty(filmName))
            {
                return BadRequest();
            }

            var newFilm = new Film()
            {
                OwnerId = Id,
                Name = filmName
            };
            if (Films.CreateNewFilm(newFilm))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
            
        }
    }
}
