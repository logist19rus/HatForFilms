using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Classes.Response
{
    public class HatResponse
    {
        public int Id { get; set; }
        public virtual List<FilmInHat> Films { get; set; }
    }
}
