using Helper;
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
        public ApiResult Auth([FromQuery]string login, [FromQuery]string pass)
        {
            var user = Users.Auth(login, pass);
            if (user != null)
            {
                var creds = new AccountResponse()
                {
                    token = user.token.token,
                    id = user.Id
                };
                return ApiResultCreator.CreateOkResponse(creds);
            }
            else
            {
                return ApiResultCreator.CreateErrorResponse("Error");
            }
        }

        [Route("Reg")]
        [HttpPost]
        public ApiResult Register([FromHeader] string login, [FromHeader] string pass)
        {
            var res = Users.Register(login, pass, tokenGenerator.getToken());

            if (res)
            {
                return ApiResultCreator.CreateOkResponse(res);
            }

            return ApiResultCreator.CreateErrorResponse("Error");
        }

        [Route("GetMe")]
        [HttpGet]
        public ApiResult GetMe([FromHeader] int Id, [FromHeader] string token)
        {
            if (!IdentifyUser.isValid(Id, token))
            {
                return ApiResultCreator.CreateErrorResponse("Неверный токен");
            }

            var user = Users.GetById(Id);

            if(user == null)
            {
                return ApiResultCreator.CreateErrorResponse("Пользователь не найден");
            }

            user.password = "";

            return ApiResultCreator.CreateOkResponse(user);
        }
    }
}
