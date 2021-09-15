using Models.Classes;
using Models.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Repositories
{
    public class FilmInHatRepository
    {
        public bool CreateNewSub(FilmInHat entity)
        {
            try
            {
                using (var db = new ApplicationContext())
                {
                    db.FilmesInHats.Add(entity);
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
