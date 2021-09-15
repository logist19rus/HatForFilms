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
        }
    }
}
