using Microsoft.AspNetCore.Http;
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
    [Route("api/identify")]
    [ApiController]
    public class IdentifyController : ControllerBase
    {
        private UserRepository Users = new UserRepository();

        [Route("Authorize")]
        [HttpGet]
        public AccountResponse Auth([FromQuery]string login, [FromQuery]string pass)
        {
            var user = Users.Auth(login, pass);
            return new AccountResponse { token = user.token?.token, id = user.Id };
        }

        [Route("Reg")]
        [HttpPost]
        public StatusCodeResult Register([FromHeader] string login, [FromHeader] string pass)
        {
            var res = Users.Register(login, pass);

            if (res)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
