using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Classes;

namespace Models.Data
{
    public class FilmContext : IEntityTypeConfiguration<Film>
    {
        public void Configure(EntityTypeBuilder<Film> builder)
        {
            builder.ToTable("Films");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasColumnName("Name");
            builder.Property(x => x.Description).HasColumnName("Description");
            builder.Property(x => x.LinkForWatch).HasColumnName("Link");
            builder.Property(x => x.PhotoSrc).HasColumnName("Photo");
            builder.Property(x => x.CountOfSeries).HasColumnName("CountOfSeries");
            builder.Property(x => x.WatchedSeries).HasColumnName("WatchedSeries");

            builder.HasMany(x => x.FilmToHatRelationship)
                .WithOne(x => x.Film)
                .HasForeignKey(x => x.filmId)
                .HasPrincipalKey(x => x.Id);
        }
    }
}
