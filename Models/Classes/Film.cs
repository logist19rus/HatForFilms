using System.Collections.Generic;

namespace Models.Classes
{
    public class Film
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? OwnerId { get; set; }
        public string Description { get; set; }
        public int? CountOfSeries { get; set; }
        public int? WatchedSeries { get; set; }
        public string PhotoSrc { get; set; }
        public string LinkForWatch { get; set; }

        public virtual List<FilmInHat> FilmToHatRelationship { get; set; }
    }
}
