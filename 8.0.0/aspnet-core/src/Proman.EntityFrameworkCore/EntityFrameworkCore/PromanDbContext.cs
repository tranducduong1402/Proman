using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;
using Proman.MultiTenancy;

namespace Proman.EntityFrameworkCore
{
    public class PromanDbContext : AbpZeroDbContext<Tenant, Role, User, PromanDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public PromanDbContext(DbContextOptions<PromanDbContext> options)
            : base(options)
        {
        }
    }
}
