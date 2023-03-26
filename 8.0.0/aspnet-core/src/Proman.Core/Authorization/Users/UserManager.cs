using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Organizations;
using Abp.Runtime.Caching;
using Proman.Authorization.Roles;
using Abp.Authorization.Roles;
using System.Linq;
using System.Threading.Tasks;

namespace Proman.Authorization.Users
{
    public class UserManager : AbpUserManager<Role, User>
    {
        public UserManager(
          RoleManager roleManager,
          UserStore store,
          IOptions<IdentityOptions> optionsAccessor,
          IPasswordHasher<User> passwordHasher,
          IEnumerable<IUserValidator<User>> userValidators,
          IEnumerable<IPasswordValidator<User>> passwordValidators,
          ILookupNormalizer keyNormalizer,
          IdentityErrorDescriber errors,
          IServiceProvider services,
          ILogger<UserManager<User>> logger,
          IPermissionManager permissionManager,
          IUnitOfWorkManager unitOfWorkManager,
          ICacheManager cacheManager,
          IRepository<OrganizationUnit, long> organizationUnitRepository,
          IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository,
          IOrganizationUnitSettings organizationUnitSettings,
          ISettingManager settingManager, 
          IRepository<UserLogin, long> userLoginRepository)
          : base(
              roleManager,
              store,
              optionsAccessor,
              passwordHasher,
              userValidators,
              passwordValidators,
              keyNormalizer,
              errors,
              services,
              logger,
              permissionManager,
              unitOfWorkManager,
              cacheManager,
              organizationUnitRepository,
              userOrganizationUnitRepository,
              organizationUnitSettings,
              settingManager,
              userLoginRepository)
        {
        }

        public virtual async Task<IdentityResult> SetRoles(User user, string[] roleNames)
        {
            await AbpUserStore.UserRepository.EnsureCollectionLoadedAsync(user, (User u) => u.Roles);
            foreach (UserRole item in user.Roles.ToList())
            {
                Role role2 = await RoleManager.FindByIdAsync(item.RoleId.ToString());
                if (roleNames.All((string roleName) => role2.Name != roleName))
                {
                    IdentityResult identityResult = await RemoveFromRoleAsync(user, role2.Name);
                    if (!identityResult.Succeeded)
                    {
                        return identityResult;
                    }
                }
            }

            foreach (string roleName2 in roleNames)
            {
                Role role = await RoleManager.GetRoleByNameAsync(roleName2);
                if (user.Roles.All((UserRole ur) => ur.RoleId != role.Id))
                {
                    IdentityResult identityResult2 = await AddToRoleAsync(user, roleName2);
                    if (!identityResult2.Succeeded)
                    {
                        return identityResult2;
                    }
                }
            }

            return IdentityResult.Success;
        }
    }
}
