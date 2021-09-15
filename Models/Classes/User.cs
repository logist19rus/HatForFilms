using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Classes
{
    public class User
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public int? TokenId { get; set; }

        public virtual Token token { get; set; }
        public virtual List<Hat> Hats { get; set; }
        public virtual List<Film> AddedFilms { get; set; }
        public virtual List<FilmInHat> InHatFilms { get; set; }
        public virtual List<Hat> MemberedHats { get; set; }

        public User() { }

        public User(string _login, string _pass, int _id =0)
        {
            this.login = _login;
            this.password = _pass;
            this.Id = _id;
        }
    }
}
