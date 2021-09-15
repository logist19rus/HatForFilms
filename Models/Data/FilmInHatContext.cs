using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Data
{
    class FilmInHatContext : IEntityTypeConfiguration<FilmInHat>
    {
        public void Configure(EntityTypeBuilder<FilmInHat> builder)
        {
            builder.ToTable("FilmesInHats");
            builder.HasKey(x=>x.Id);
            builder.Property(x => x.hatId).HasColumnName("HatId");
            builder.Property(x => x.filmId).HasColumnName("FilmId");
            builder.Property(x => x.adderId).HasColumnName("AdderId");

            builder.HasOne(x => x.Adder)
                .WithMany(x => x.InHatFilms)
                .HasForeignKey(x => x.adderId)
                .HasPrincipalKey(x => x.Id);

            builder.HasOne(x => x.Film)
                .WithMany(x => x.FilmToHatRelationship)
                .HasForeignKey(x => x.filmId)
                .HasPrincipalKey(x => x.Id);

            builder.HasOne(x => x.Hat)
                .WithMany(x => x.Films)
                .HasForeignKey(x => x.hatId)
                .HasPrincipalKey(x => x.Id);
        }
    }
}
