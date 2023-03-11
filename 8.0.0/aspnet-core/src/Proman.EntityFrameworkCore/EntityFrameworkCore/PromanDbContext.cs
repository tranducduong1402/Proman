using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;
using Proman.MultiTenancy;
using Proman.Entities;

namespace Proman.EntityFrameworkCore
{
    public class PromanDbContext : AbpZeroDbContext<Tenant, Role, User, PromanDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectUser> ProjectUsers { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ReviewUser> ReviewUsers { get; set; }
        public DbSet<ReviewUserDetail> ReviewUserDetails { get; set; }
        public PromanDbContext(DbContextOptions<PromanDbContext> options)
            : base(options)
        {
        }
    }
}
