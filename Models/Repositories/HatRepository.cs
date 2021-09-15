using Microsoft.EntityFrameworkCore;
using Models.Classes;
using Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Models.Repositories
{
    public class HatRepository
    {
        public List<Hat> GetByUserId(int userId)
        {
            var hats = new List<Hat>();

            using (var db = new ApplicationContext())
            {
                hats = db.Hats.Include(x => x.Films).Where(x => x.CreatorId == userId || x.MemberId == userId).ToList();
            }

            return hats;
        }

        public bool CreateNewHat(Hat hat)
        {
            try
            {
                using (var db = new ApplicationContext())
                {
                    db.Hats.Add(hat);
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
