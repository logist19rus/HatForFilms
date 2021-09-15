using Models.Classes;
using Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Models.Repositories
{
    public class TokenRepository
    {
        public bool ValidateToken(int Id, string token)
        {
            using (var db = new ApplicationContext())
            {
                return db.Tokens.Any(x => x.UserId == Id && x.token == token);
            }
        }
    }
}
