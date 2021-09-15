using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Classes;

namespace Models.Data
{
    public class UserContext: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.TokenId).HasColumnName("TokenId");
            builder.Property(x => x.login).HasColumnName("Login");
            builder.Property(x => x.password).HasColumnName("Password");

            builder.HasMany(x => x.Hats)
                .WithOne(x => x.Creator)
                .HasForeignKey(x => x.CreatorId)
                .HasPrincipalKey(x => x.Id);

            builder.HasMany(x => x.MemberedHats)
                .WithOne(x => x.Member)
                .HasForeignKey(x => x.MemberId)
                .HasPrincipalKey(x => x.Id);

            builder.HasOne(x => x.token)
                .WithOne(x => x.User)
                .HasForeignKey<Token>(x=>x.UserId)
                .HasPrincipalKey<User>(x=>x.Id);

            builder.HasMany(x => x.AddedFilms)
                .WithOne(x => x.Owner)
                .HasForeignKey(x => x.OwnerId)
                .HasPrincipalKey(x => x.Id);

            builder.HasMany(x => x.InHatFilms)
                .WithOne(x => x.Adder)
                .HasForeignKey(x => x.adderId)
                .HasPrincipalKey(x => x.Id);
        }
    }
}
