using Microsoft.EntityFrameworkCore;
using Models.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Data
{
    public class ApplicationContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Film> Films { get; set; }
        public DbSet<Hat> Hats { get; set; }
        public DbSet<FilmInHat> FilmesInHats { get; set; }
        public DbSet<Token> Tokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer("Server=193.124.118.67\\LOGISTBASE;Database=HatForFilms;User Id=logist;Password=1YlCTLs44RGa");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TokenContext());
            modelBuilder.ApplyConfiguration(new FilmContext());
            modelBuilder.ApplyConfiguration(new FilmInHatContext());
            modelBuilder.ApplyConfiguration(new UserContext());
            modelBuilder.ApplyConfiguration(new HatContext());
        }
    }
}
