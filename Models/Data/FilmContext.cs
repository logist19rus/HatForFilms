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

            builder.HasMany(x => x.FilmToHatRelationship)
                .WithOne(x => x.Film)
                .HasForeignKey(x => x.filmId)
                .HasPrincipalKey(x => x.Id);
        }
    }
}
