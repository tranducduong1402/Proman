using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.ObjectMapping;
using Abp.Runtime.Session;
using Microsoft.EntityFrameworkCore;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;
using Proman.DomainServices.Dto;
using Proman.Entities;
using Proman.IIoc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.DomainServices
{
    public class UserServices : BaseDomainService, IUserServices, ITransientDependency
    {
        private readonly UserManager _userManager;
        private readonly IAbpSession _abpSession;
        private readonly RoleManager _roleManager;
        private readonly IWorkLimit _worklimit;

        public UserServices(UserManager userManager, IAbpSession abpSession, RoleManager roleManager, IObjectMapper objectMapper, IWorkLimit workLimit) : base(workLimit)
        {
            _userManager = userManager;
            _abpSession = abpSession;
            _roleManager = roleManager;
        }

        public async Task<User> CreateUserAsync(CreateUserDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            user.TenantId = _abpSession.TenantId;
            user.UserName = input.UserName?.Replace("@gmail.com", "");
            user.IsEmailConfirmed = true;
            user.NormalizedUserName = input.UserName.ToLower();
            user.NormalizedEmailAddress = input.EmailAddress.ToLower();

            await _userManager.InitializeOptionsAsync(_abpSession.TenantId);
            await _userManager.CreateAsync(user, input.Password);
            input.RoleNames = new string[] { StaticRoleNames.Host.BasicUser };
            await _userManager.SetRolesAsync(user, input.RoleNames);
            CurrentUnitOfWork.SaveChanges();
            var q = WorkLimit.GetAll<Project>()
                    .Where(p => p.Status == ProjectStatus.Active)
                    .Select(p => p.Id).ToList();
            foreach (var projectId in q)
            {
                var projectUser = new ProjectUser
                {
                    ProjectId = projectId,
                    UserId = user.Id,
                    Type = ProjectUserType.Member
                };
                await WorkLimit.InsertAsync<ProjectUser>(projectUser);
            }

            return user;
        }

        public IQueryable<User> GetUserByRole(string roleName)
        {
            var quser =
                from u in WorkLimit.GetAll<User, long>()
                join r in
                    from ur in WorkLimit.GetAll<UserRole, long>()
                    join role in WorkLimit.GetAll<Role, int>().Where(s => s.Name == roleName)
                    on ur.RoleId equals role.Id
                    select ur.UserId
                on u.Id equals r into roles
                where roles.Any()
                select u;

            return quser;
        }

        public async Task<long?> GetUserIdByEmail(string email)
        {
            return await WorkLimit.GetAll<User>()
                .Where(s => s.EmailAddress.ToLower().Trim() == email.ToLower().Trim())
                .Select(s => s.Id)
                .FirstOrDefaultAsync();
        }

        public async Task<UserDto> UpdateUserAsync(UserDto input)
        {
            var user = _userManager.GetUserByIdAsync(input.Id).Result;
            if (string.IsNullOrEmpty(input.AvatarPath))
            {
                input.AvatarPath = user.AvatarPath;
            }


            ObjectMapper.Map(input, user);

            user.UserName = input.UserName?.Replace("@gmail.com", "");

            await _userManager.UpdateAsync(user);

            return input;
        }

        public IQueryable<string> UserAllRoles(long userId)
        {
            var userAllroles = from u in WorkLimit.GetAll<UserRole, long>().Where(u => u.UserId == userId)
                               join r in WorkLimit.GetAll<Role, int>()
                               on u.RoleId equals r.Id into roles
                               from r in roles
                               select r.Name;
            return userAllroles;
        }

        public bool UserHasRole(long userId, string roleName)
        {
            var quser =
                    from ur in WorkLimit.GetAll<UserRole, long>().Where(u => u.UserId == userId)
                    join role in WorkLimit.GetAll<Role, int>().Where(s => s.Name == roleName)
                    on ur.RoleId equals role.Id into roles
                    from r in roles
                    select r.Id;
            return quser.Any();
        }
    }
}
