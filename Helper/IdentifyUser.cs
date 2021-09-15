using Models.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Helper
{
    public static class IdentifyUser
    {
        public static bool isValid(int id, string token)
        {
            var tokens = new TokenRepository();
            return tokens.ValidateToken(id, token);
        }
    }
}
