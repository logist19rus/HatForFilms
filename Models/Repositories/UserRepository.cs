using Microsoft.EntityFrameworkCore;
using Models.Classes;
using Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Models.Repositories
{
    public class UserRepository
    {
        public User Auth(string login, string password)
        {
            using (var db = new ApplicationContext())
            {
                return db.Users
                    .Include(x => x.token)
                    .Where(x => x.login == login && x.password == password)
                    .FirstOrDefault();
            }
        }

        public bool Register(string login, string pass, string token)
        {
            var newUser = new User()
            {
                login = login,
                password = pass,
                token = new Token
                {
                    LastActivity= DateTime.Now,
                    token = token
                }
            };
            try
            {
                using (var db = new ApplicationContext())
                {
                    if(db.Users.Any(x=>x.login == login))
                    {
                        return false;
                    }

                    var User = db.Users.Add(newUser);
                    db.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
