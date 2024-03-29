﻿using Helper;
using Microsoft.AspNetCore.Mvc;
using Models.Classes;
using Models.Classes.Response;
using Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HatForFilms.Controllers
{
    [Route("api/Hats")]
    [ApiController]
    public class HatController: ControllerBase
    {
        HatRepository HatRepository = new HatRepository();
        FilmRepository FilmRepository = new FilmRepository();
        public HatController()
        {

        }

        [Route("GetSingle")]
        [HttpGet]
        public Hat GetSingleById([FromHeader] int Id, [FromHeader] string token, [FromQuery] int hatId)
        {
            if (!IdentifyUser.isValid(Id, token))
            {
                return null;
            }
            var films = FilmRepository.GetAll();

            var res = HatRepository.GetByUserId(Id).FirstOrDefault(x => x.Id == hatId);
            foreach(var r in res.Films)
            {
                r.Film = films.FirstOrDefault(x => x.Id == r.filmId);
            }
            return res;
        }

        [Route("GetMy")]
        [HttpGet]
        public List<HatResponse> GetHatsById([FromHeader] int Id, [FromHeader]string token)
        {
            
            if (!IdentifyUser.isValid(Id, token))
            {
                return null;
            }
            
            var res = HatRepository.GetByUserId(Id);
            var resp = new List<HatResponse>();
            foreach(var x in res)
            {
                var asd = new HatResponse()
                {
                    Id = x.Id,
                    Films = x.Films
                };
                resp.Add(asd);
            }

            return resp;
        }

        [Route("CreateForMe")]
        [HttpPost]
        public ActionResult Create([FromHeader] int Id, [FromHeader] string token)
        {
            if (!IdentifyUser.isValid(Id, token))
            {
                return BadRequest();
            }

            var newHat = new Hat()
            {
                CreatorId = Id
            };

            if (HatRepository.CreateNewHat(newHat))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
            
        }

        [HttpPost]
        [Route("MemberSet")]
        public ActionResult SetMember([FromHeader] int Id, [FromHeader] string token,
            [FromQuery]int hatId, [FromQuery]int memberId)
        {
            if (!IdentifyUser.isValid(Id, token))
            {
                return BadRequest();
            }

            if (HatRepository.ChangeHatMember(hatId, memberId))
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
