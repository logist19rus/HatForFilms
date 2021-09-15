using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Data
{
    public class HatContext : IEntityTypeConfiguration<Hat>
    {
        public void Configure(EntityTypeBuilder<Hat> builder)
        {
            builder.ToTable("Hats");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.CreatorId).HasColumnName("CreatorId");

            builder.HasOne(x => x.Creator)
                .WithMany(x => x.Hats)
                .HasForeignKey(x => x.CreatorId)
                .HasPrincipalKey(x => x.Id);

            builder.HasOne(x => x.Member)
                .WithMany(x => x.MemberedHats)
                .HasForeignKey(x => x.MemberId)
                .HasPrincipalKey(x => x.Id);

            builder.HasMany(x => x.Films)
                .WithOne(x => x.Hat)
                .HasForeignKey(x => x.hatId)
                .HasPrincipalKey(x => x.Id);
        }
    }
}
