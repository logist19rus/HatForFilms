using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Classes
{
    public class Hat
    {
        public int Id { get; set; }
        public int? CreatorId { get; set; }
        public int? MemberId { get; set; }

        public virtual List<FilmInHat> Films { get; set; }
    }
}
