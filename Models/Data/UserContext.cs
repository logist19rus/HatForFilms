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
            builder.Property(x => x.Name).HasColumnName("Name");
            builder.Property(x => x.PhotoSrc).HasColumnName("PhotoSrc");

            builder.HasOne(x => x.token)
                .WithOne(x => x.User)
                .HasForeignKey<Token>(x=>x.UserId)
                .HasPrincipalKey<User>(x=>x.Id);
        }
    }
}
