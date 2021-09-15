using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Data
{
    public class TokenContext : IEntityTypeConfiguration<Token>
    {
        public void Configure(EntityTypeBuilder<Token> builder)
        {
            builder.ToTable("Tokens");
            builder.HasKey(x=>x.Id);
            builder.Property(x => x.token).HasColumnName("Token");
            builder.Property(x => x.LastActivity).HasColumnName("LastActivity");
            builder.Property(x => x.UserId).HasColumnName("UserId");
        }
    }
}
