using Microsoft.EntityFrameworkCore;
using MyProfile.API.Models;

namespace MyProfile.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<WorkExperience> WorkExperiences { get; set; }



        public DbSet<Skill> Skills { get; set; }
        public DbSet<Certificate> Certificates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Skill>()
                .HasOne(s => s.User)
                .WithMany(u => u.Skills)
                .HasForeignKey(s => s.UserId);
            modelBuilder.Entity<Certificate>()
                .HasOne(s => s.User)
                .WithMany(u => u.Certificates)
                .HasForeignKey(s => s.UserId);
        }
    }
}
