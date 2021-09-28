using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace VacationManagement.Infrastructure.Repository.Entities
{
    public partial class MyVacationMemoryContext : DbContext
    {
        public MyVacationMemoryContext()
        {
        }

        public MyVacationMemoryContext(DbContextOptions<MyVacationMemoryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Attraction> Attractions { get; set; }
        public virtual DbSet<Restaurant> Restaurants { get; set; }
        public virtual DbSet<Trip> Trips { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=JRUAN-840g5;Database=MyVacationMemory;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Attraction>(entity =>
            {
                entity.Property(e => e.AttractionName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Cost).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.Trip)
                    .WithMany(p => p.Attractions)
                    .HasForeignKey(d => d.TripId)
                    .HasConstraintName("FK__Attractio__TripI__49C3F6B7");
            });

            modelBuilder.Entity<Restaurant>(entity =>
            {
                entity.Property(e => e.CostRange)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RestaurantName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Style)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Trip)
                    .WithMany(p => p.Restaurants)
                    .HasForeignKey(d => d.TripId)
                    .HasConstraintName("FK__Restauran__TripI__4CA06362");
            });

            modelBuilder.Entity<Trip>(entity =>
            {
                entity.Property(e => e.Destination)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.TripName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
