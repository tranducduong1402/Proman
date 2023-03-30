﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using Abp.Localization;
using Abp.Runtime.Session;
using Abp.UI;
using Proman.Authorization;
using Proman.Authorization.Accounts;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Proman.DomainServices.Dto;
using Proman.Roles.Dto;
using Proman.Users.Dto;
using Abp.Authorization.Users;
using Proman.Entities;
using Proman.Paging;
using static Proman.Constants.Enum.StatusEnum;
using Proman.IIoc;
using Proman.Extension;
using Castle.Core.Internal;
using Proman.APIs.Positions.Dto;
using System.Data;

namespace Proman.Users
{
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : AsyncCrudAppService<User, UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>, IUserAppService
    {
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly IRepository<Role> _roleRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAbpSession _abpSession;
        private readonly LogInManager _logInManager;
        private readonly IWorkLimit _workLimit;

        public UserAppService(
            IRepository<User, long> repository,
            UserManager userManager,
            RoleManager roleManager,
            IRepository<Role> roleRepository,
            IPasswordHasher<User> passwordHasher,
            IAbpSession abpSession,
            IWorkLimit workLimit,
            LogInManager logInManager)
            : base(repository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _roleRepository = roleRepository;
            _passwordHasher = passwordHasher;
            _abpSession = abpSession;
            _logInManager = logInManager;
            _workLimit = workLimit;
        }

        public override async Task<UserDto> CreateAsync(CreateUserDto input)
        {
            CheckCreatePermission();

            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.IsEmailConfirmed = true;

            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

            CheckErrors(await _userManager.CreateAsync(user, input.Password));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(user);
        }

        public override async Task<UserDto> UpdateAsync(UserDto input)
        {
            CheckUpdatePermission();

            var user = await _userManager.GetUserByIdAsync(input.Id);

            MapToEntity(input, user);

            CheckErrors(await _userManager.UpdateAsync(user));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
            }

            return await GetAsync(input);
        }

        public override async System.Threading.Tasks.Task DeleteAsync(EntityDto<long> input)
        {
            var user = await _userManager.GetUserByIdAsync(input.Id);
            await _userManager.DeleteAsync(user);
        }

        [AbpAuthorize(PermissionNames.Pages_Users_Activation)]
        public async System.Threading.Tasks.Task Activate(EntityDto<long> user)
        {
            await Repository.UpdateAsync(user.Id, async (entity) =>
            {
                entity.IsActive = true;
            });
        }

        [AbpAuthorize(PermissionNames.Pages_Users_Activation)]
        public async System.Threading.Tasks.Task DeActivate(EntityDto<long> user)
        {
            await Repository.UpdateAsync(user.Id, async (entity) =>
            {
                entity.IsActive = false;
            });
        }

        public async Task<ListResultDto<RoleDto>> GetRoles()
        {
            var roles = await _roleRepository.GetAllListAsync();
            return new ListResultDto<RoleDto>(ObjectMapper.Map<List<RoleDto>>(roles));
        }

        public async System.Threading.Tasks.Task ChangeLanguage(ChangeUserLanguageDto input)
        {
            await SettingManager.ChangeSettingForUserAsync(
                AbpSession.ToUserIdentifier(),
                LocalizationSettingNames.DefaultLanguage,
                input.LanguageName
            );
        }

        protected override User MapToEntity(CreateUserDto createInput)
        {
            var user = ObjectMapper.Map<User>(createInput);
            user.SetNormalizedNames();
            return user;
        }

        protected override void MapToEntity(UserDto input, User user)
        {
            ObjectMapper.Map(input, user);
            user.SetNormalizedNames();
        }

        protected override UserDto MapToEntityDto(User user)
        {
            var roleIds = user.Roles.Select(x => x.RoleId).ToArray();

            var roles = _roleManager.Roles.Where(r => roleIds.Contains(r.Id)).Select(r => r.NormalizedName);

            var userDto = base.MapToEntityDto(user);
            userDto.RoleNames = roles.ToArray();

            return userDto;
        }

        protected override IQueryable<User> CreateFilteredQuery(PagedUserResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Roles)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.UserName.Contains(input.Keyword) || x.Name.Contains(input.Keyword) || x.EmailAddress.Contains(input.Keyword))
                .WhereIf(input.IsActive.HasValue, x => x.IsActive == input.IsActive);
        }

        protected override async Task<User> GetEntityByIdAsync(long id)
        {
            var user = await Repository.GetAllIncluding(x => x.Roles).FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                throw new EntityNotFoundException(typeof(User), id);
            }

            return user;
        }

        protected override IQueryable<User> ApplySorting(IQueryable<User> query, PagedUserResultRequestDto input)
        {
            return query.OrderBy(r => r.UserName);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

        public async Task<bool> ChangePassword(ChangePasswordDto input)
        {
            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

            var user = await _userManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            if (user == null)
            {
                throw new Exception("There is no current user!");
            }
            
            if (await _userManager.CheckPasswordAsync(user, input.CurrentPassword))
            {
                CheckErrors(await _userManager.ChangePasswordAsync(user, input.NewPassword));
            }
            else
            {
                CheckErrors(IdentityResult.Failed(new IdentityError
                {
                    Description = "Incorrect password."
                }));
            }

            return true;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto input)
        {
            if (_abpSession.UserId == null)
            {
                throw new UserFriendlyException("Please log in before attempting to reset password.");
            }
            
            var currentUser = await _userManager.GetUserByIdAsync(_abpSession.GetUserId());
            var loginAsync = await _logInManager.LoginAsync(currentUser.UserName, input.AdminPassword, shouldLockout: false);
            if (loginAsync.Result != AbpLoginResultType.Success)
            {
                throw new UserFriendlyException("Your 'Admin Password' did not match the one on record.  Please try again.");
            }
            
            if (currentUser.IsDeleted || !currentUser.IsActive)
            {
                return false;
            }
            
            var roles = await _userManager.GetRolesAsync(currentUser);
            if (!roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                throw new UserFriendlyException("Only administrators may reset passwords.");
            }

            var user = await _userManager.GetUserByIdAsync(input.UserId);
            if (user != null)
            {
                user.Password = _passwordHasher.HashPassword(user, input.NewPassword);
                await CurrentUnitOfWork.SaveChangesAsync();
            }

            return true;
        }

        public async System.Threading.Tasks.Task ChangeUserRole(AddUserToRoleDto input)
        {
            var user = await _userManager.GetUserByIdAsync(input.UserId);
            var listRole = await _userManager.GetRolesAsync(user);
            bool flag = false;

            foreach (var role in listRole)
            {
                if (role.Equals(input.Role))
                {
                    listRole.Remove(role);
                    flag = true;
                    break;
                }
            }

            if (!flag) listRole.Add(input.Role);

            string[] roles = listRole.ToArray();

            if (input.Role != null)
            {
                await _userManager.SetRoles(user, roles);
            }
        }

        public async Task<List<GetUserDto>> GetUserNotPagging()
        {
            var dicUsers = _workLimit.GetAll<User>()
                                    .Select(s => new
                                    {
                                        s.Id,
                                        s.FullName,
                                    }).ToDictionary(s => s.Id, s => s.FullName);

            return await this.Repository.GetAll()
                .Select(s => new GetUserDto
                {
                    Id = s.Id,
                    Name = s.FullName,
                    UserName = s.UserName,
                    EmailAddress = s.EmailAddress,
                    IsActive = s.IsActive,
                    Type = s.Type,
                    UserCode = s.UserCode,
                    Level = s.Level,
                    AvatarPath = s.AvatarPath != null ? s.AvatarPath : "",
                    PositionId = s.Position.Id,
                    PositionName = s.Position.Name,
                    LastModifierTime = s.LastModificationTime,
                    CreationTime = s.CreationTime,
                    CreatedUserName = (s.CreatorUserId.HasValue && dicUsers.ContainsKey(s.CreatorUserId.Value)) ? dicUsers[s.CreatorUserId.Value] : "",
                    LastModifierUserName = (s.LastModifierUserId.HasValue && dicUsers.ContainsKey(s.LastModifierUserId.Value)) ? dicUsers[s.LastModifierUserId.Value] : "",
                }).ToListAsync();
        }

        public async Task<PagedResultDto<GetAllUserDto>> GetAllPagging(GridParam input)
        {
            var qUserRoles = from ur in _workLimit.GetAll<UserRole>()
                             join r in _workLimit.GetAll<Role, int>() on ur.RoleId equals r.Id
                             select new
                             {
                                 ur.UserId,
                                 RoleName = r.Name
                             };

            var qprojectUsers = from pu in _workLimit.GetAll<ProjectUser>().Where(s => s.User.IsActive == true)
                                join p in _workLimit.GetAll<Project>().Where(s => s.Status == ProjectStatus.Active) on pu.ProjectId equals p.Id
                                where pu.Type != ProjectUserType.DeActive
                                select new
                                {
                                    pu.ProjectId,
                                    p.Code,
                                    p.Name,
                                    pu.UserId,
                                    pu.Type
                                };


            var query = from u in _workLimit.GetAll<User>()
                        join pu in qprojectUsers on u.Id equals pu.UserId into pusers
                        join ur in qUserRoles on u.Id equals ur.UserId into roles
                        join mu in _workLimit.GetAll<User>() on u.ManagerId equals mu.Id into muu
                        select new GetAllUserDto
                        {
                            Id = u.Id,
                            UserName = u.UserName,
                            Name = u.Name,
                            Surname = u.Surname,
                            FullName = u.FullName,
                            Address = u.Address,
                            IsActive = u.IsActive,
                            EmailAddress = u.EmailAddress,
                            RoleNames = roles.Select(s => s.RoleName).ToArray(),
                            ProjectUsers = pusers.Select(s => new PUDto
                            {
                                ProjectId = s.ProjectId,
                                ProjectName = s.Name,
                                ProjectCode = s.Code,
                                ProjectUserType = s.Type
                            }).ToList(),
                            Type = u.Type,
                            Level = u.Level,
                            StartDateAt = u.StartDateAt,
                            UserCode = u.UserCode,
                            AvatarPath = u.AvatarPath,
                            ManagerId = u.ManagerId,
                            Sex = u.Sex,
                            CreationTime = u.CreationTime,
                            ManagerName = muu.FirstOrDefault() != null ? muu.FirstOrDefault().FullName : "",
                            ManagerAvatarPath = muu.FirstOrDefault() != null ? muu.FirstOrDefault().AvatarPath : "",
                            PositionId = u.Position.Id,
                            PositionName = u.Position.Name
                        };
            query = query.OrderByDescending(s => s.CreationTime);
            var temp = await query.GetGridResult(query, input);

            var projectIds = new HashSet<long?>();
            foreach (var user in temp.Items)
            {
                projectIds.UnionWith(user.ProjectUsers.Select(s => s.ProjectId));
            }

            var projects = (_workLimit.GetAll<ProjectUser>()
                    .Where(s => projectIds.Contains(s.ProjectId) && s.Type == ProjectUserType.PM)
                    .Select(s => new { s.ProjectId, s.User.FullName })
                    .GroupBy(s => s.ProjectId))
                    .Select(s => new { s.Key, pms = s.Select(f => f.FullName).ToList() }).ToList();

            foreach (var user in temp.Items)
            {
                foreach (var pu in user.ProjectUsers)
                {
                    pu.Pms = projects.Where(s => s.Key == pu.ProjectId).Select(s => s.pms).FirstOrDefault();
                }
            }
            return new PagedResultDto<GetAllUserDto>(temp.TotalCount, temp.Items);
        }

        //private async Task<PUDto> GetProjectByUserId(long userId)
        //{
        //    return await _workLimit.GetAll<ProjectUser>().Where(s => s.UserId == userId)
        //        .Select(s => new PUDto
        //        {
        //            ProjectId = s.ProjectId,
        //            ProjectCode = s.Project.Code,
        //            ProjectName = s.Project.Name,
        //        }).FirstOrDefaultAsync();
        //}

        //private async Task<Role> GetRoleByUserId(long userId)
        //{
        //    var qUserRoles = from ur in _workLimit.GetAll<UserRole>()
        //                     join r in _workLimit.GetAll<Role, int>() on ur.RoleId equals r.Id
        //                     select new
        //                     {
        //                         ur.UserId,
        //                         RoleName = r.Name
        //                     };
        //    return qUserRoles.FirstOrDefaultAsync();
        //}

        //public async Task<GridResult<GetAllUserDto>> GetAllPaging(GridParam input)
        //{

        //    var query = await _workLimit.GetAll<User>()
        //        .Select(s => new GetAllUserDto
        //        {
        //            Id = s.Id,
        //            UserName = s.UserName,
        //            Name = s.Name,
        //            Surname = s.Surname,
        //            FullName = s.FullName,
        //            Address = s.Address,
        //            IsActive = s.IsActive,
        //            EmailAddress = s.EmailAddress,
        //            RoleNames = roles.Select(s => s.RoleName).ToArray(),
        //            ProjectUsers = pusers.Select(s => new PUDto
        //            {
        //                ProjectId = s.ProjectId,
        //                ProjectName = s.Name,
        //                ProjectCode = s.Code,
        //                ProjectUserType = s.Type
        //            }).ToList(),
        //            Type = u.Type,
        //            Level = u.Level,
        //            StartDateAt = u.StartDateAt,
        //            UserCode = u.UserCode,
        //            AvatarPath = u.AvatarPath,
        //            ManagerId = u.ManagerId,
        //            Sex = u.Sex,
        //            CreationTime = u.CreationTime,
        //            ManagerName = muu.FirstOrDefault() != null ? muu.FirstOrDefault().FullName : "",
        //            ManagerAvatarPath = muu.FirstOrDefault() != null ? muu.FirstOrDefault().AvatarPath : "",
        //            PositionId = u.Position.Id,
        //            PositionName = u.Position.Name
        //        });
        //    return await query.GetGridResult(query, input);
        //}
    }
}

