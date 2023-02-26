using Abp.Authorization;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;

namespace Proman.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
