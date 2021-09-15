using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Classes
{
    public class FilmInHat
    {
        public int Id { get; set; }
        public int? adderId { get; set; }
        public int? filmId { get; set; }
        public int? hatId { get; set; }

        public virtual Film Film { get; set; }
    }
}
