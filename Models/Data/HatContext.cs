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
        }
    }
}
