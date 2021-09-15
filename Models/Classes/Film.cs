using System.Collections.Generic;

namespace Models.Classes
{
    public class Film
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? OwnerId { get; set; }

        public virtual User Owner { get; set; }
        public virtual List<FilmInHat> FilmToHatRelationship { get; set; }
    }
}
