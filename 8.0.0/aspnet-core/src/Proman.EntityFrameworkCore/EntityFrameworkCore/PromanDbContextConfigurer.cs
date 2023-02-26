using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Proman.EntityFrameworkCore
{
    public static class PromanDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<PromanDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<PromanDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
