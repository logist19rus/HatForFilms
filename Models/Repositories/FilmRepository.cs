using Models.Classes;
using Models.Data;
using System.Collections.Generic;
using System.Linq;

namespace Models.Repositories
{
    public class FilmRepository
    {
        public List<Film> GetAll()
        {
            var fms = new List<Film>();

            using (var db = new ApplicationContext())
            {
                fms = db.Films.ToList();
            }

            return fms;
        }

        public bool CreateNewFilm(Film film)
        {
            try
            {
                using (var db = new ApplicationContext())
                {
                    db.Films.Add(film);
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
