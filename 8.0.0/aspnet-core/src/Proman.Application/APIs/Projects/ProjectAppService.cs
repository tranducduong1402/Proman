using Abp.Authorization.Users;
using Castle.Core.Resource;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proman.APIs.Projects.Dto;
using Proman.APIs.ReviewUsers.Dto;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;
using Proman.Entities;
using Proman.Extension;
using Proman.IIoc;
using Proman.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.Projects
{
    public class ProjectAppService : PromanAppServiceBase
    {
        public ProjectAppService(IWorkLimit workLimit) : base(workLimit) { }

        [HttpPost]
        public async Task<GridResult<GetProjectDto>> GetAllPaging(GridParam input)
        {
            var query = WorkLimit.GetAll<Project>()
                .Select(s => new GetProjectDto
                { 
                    Id = s.Id,
                    Name = s.Name,
                    Code = s.Code,
                    Note = s.Note,
                    ProjectType = s.ProjectType,
                    Status = s.Status,
                    CustomerId = s.CustomerId,
                    CustomerEmailAddress = s.Customer.EmailAddress,
                    CustomerFullName = s.Customer.FullName,
                    TimeStart = s.TimeStart,
                    TimeEnd = s.TimeEnd,
                });

            return await query.GetGridResult(query, input);
        }

        [HttpPost]
        public async Task<string> CreateProject(CreateProjectDto input)
        {
            var isExistName = await WorkLimit.GetAll<Project>().AnyAsync(s => s.Name == input.Name);
            if (isExistName)
            {
                return string.Format("Fail! Project name <b>{0}</b> already exist in <b>PROMAN TOOL</b>", input.Name);
            }

            var isExistCode = await WorkLimit.GetAll<Project>().AnyAsync(s => s.Code == input.Code);
            if (isExistCode)
            {
                return string.Format("Fail! Project code <b>{0}</b> already exist in <b>PROMAN TOOL</b>", input.Code);
            }

            if (input.TimeEnd.HasValue && input.TimeStart.Date > input.TimeEnd.Value.Date)
            {
                return "Fail! Start time cannot be greater than end time in <b>PROMAN TOOL</b>";
            }

            //Customer
            var customerId = await WorkLimit.GetAll<User>()
                    .Where(s => s.UserName == input.CustomerName)
                    .Select(s => s.Id).FirstOrDefaultAsync();

            if (customerId == default)
            {
                return string.Format("Fail! Not found Customer code <b>{0}</b> in <b>PROMAN TOOL</b>", input.CustomerName);
            }

            var types = new ProjectType[] { ProjectType.ODC, ProjectType.TimeAndMaterials, ProjectType.FixedFee, ProjectType.Product, ProjectType.NoneBillable, ProjectType.Training, ProjectType.NoSalary };
            var projectType = types[input.ProjectType];

            //User
            var userByEmail = await WorkLimit.GetAll<User>()
                   .Where(s => s.EmailAddress.ToLower() == input.EmailPM.ToLower())
                   .Select(s => new
                   {
                       Id = s.Id,
                       Type = s.Type
                   }).FirstOrDefaultAsync();

            if (userByEmail == default)
            {
                return string.Format("Fail! Not found PM with email <b>{0}</b> in <b>PROMAN TOOL</b>", input.EmailPM);
            }

            //insert project
            var project = new Project
            {
                Name = input.Name,
                Code = input.Code,
                CustomerId = customerId,
                ProjectType = projectType,
                TimeStart = input.TimeStart,
                TimeEnd = input.TimeEnd,
                Status = ProjectStatus.Active
            };
            input.Id = await WorkLimit.InsertAndGetIdAsync<Project>(project);

            //insert projectUser
            var projectUser = new ProjectUser
            {
                ProjectId = input.Id,
                UserId = userByEmail.Id,
                Type = ProjectUserType.PM,
                IsTemp = false
            };
            await WorkLimit.GetRepo<ProjectUser, long>().InsertAsync(projectUser);

            return null;
        }

        [HttpPost]
        public async Task<string> CloseProject(string code)
        {
            //project
            var project = await WorkLimit.GetAll<Project>()
                    .Where(s => s.Code == code)
                    .FirstOrDefaultAsync();

            if (project == default)
            {
                return string.Format("Fail! Not found project code <b>{0}</b> in <b>PROMAN TOOL</b>", code);
            }

            project.Status = ProjectStatus.Deactive;
            await WorkLimit.UpdateAsync(project);

            return null;
        }

        private async Task<long> GetProjectIdByCode(string code)
        {
            return await WorkLimit.GetAll<Project>()
                    .Where(s => s.Code == code).Select(s => s.Id)
                    .FirstOrDefaultAsync();
        }

        private async Task<long> GetUserIdByEmail(string email)
        {
            if (email.IsEmpty())
            {
                return default;
            }
            return await WorkLimit.GetAll<User>()
                    .Where(s => s.EmailAddress == email).Select(s => s.Id)
                    .FirstOrDefaultAsync();
        }

        private async Task<User> GetUserByEmail(string email)
        {
            return await WorkLimit.GetAll<User>()
                    .Where(s => s.EmailAddress == email)
                    .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<string> UserJoinProject(UserJoinProjectDto input)
        {
            //project
            var projectId = await GetProjectIdByCode(input.ProjectCode);

            if (projectId == default)
            {
                return string.Format("Fail! Not found project code <b>{0}</b> in <b>PROMAN TOOL</b>", input.ProjectCode);
            }

            //user
            var user = await GetUserByEmail(input.EmailAddress);
            var basicTranerId = await GetUserIdByEmail(input.PMEmail);

            if (user == default)
            {
                return string.Format("Fail! Not found user with email <b>{0}</b> in <b>PROMAN TOOL</b>", input.EmailAddress);
            }
            if (basicTranerId == default)
            {
                Logger.Error(string.Format("Update Basic Traner Fail! Not found user with email <b>{0}</b> in <b>PROMAN TOOL</b>", input.PMEmail));
            }
            else
            {
                user.ManagerId = basicTranerId;
            }
            var pu = await WorkLimit.GetAll<ProjectUser>()
                .Where(s => s.UserId == user.Id)
                .Where(s => s.ProjectId == projectId)
                .FirstOrDefaultAsync();
            int ProjectUserTypePM = 0;
            if (pu == default)
            {
                var projectUser = new ProjectUser
                {
                    ProjectId = projectId,
                    UserId = user.Id,
                    Type = input.Role == ProjectUserTypePM ? ProjectUserType.PM : ProjectUserType.Member,
                    IsTemp = input.IsPool
                };
                await WorkLimit.GetRepo<ProjectUser, long>().InsertAsync(projectUser);
            }
            else
            {
                pu.IsTemp = input.IsPool;
                if (pu.Type == ProjectUserType.DeActive)
                {
                    pu.Type = ProjectUserType.Member;
                }
                await WorkLimit.UpdateAsync(pu);
            }
            CurrentUnitOfWork.SaveChanges();

            return null;
        }

        [HttpPost]
        public async Task<string> ChangePmOfProject(CreateProjectDto input)
        {
            //project
            var projectId = await GetProjectIdByCode(input.Code);

            if (projectId == default)
            {
                return string.Format("Fail! Not found project code <b>{0}</b> in <b>TIMESHEET TOOL</b>", input.Code);
            }


            if (string.IsNullOrEmpty(input.EmailPM))
            {
                return "Fail! Email are not allowed to be empty <b>{0}</b> in <b>TIMESHEET TOOL</b>";
            }
            //insert projectUser
            var userId = await GetUserIdByEmail(input.EmailPM);

            if (userId == default)
            {
                return string.Format("Fail! Not found PM with email <b>{0}</b> in <b>TIMESHEET TOOL</b>", input.EmailPM);
            }

            var userInProject = await WorkLimit.GetAll<ProjectUser>()
                .Where(s => s.UserId == userId)
                .Where(s => s.ProjectId == projectId)
                .FirstOrDefaultAsync();

            if (userInProject == default)
            {
                var projectUser = new ProjectUser
                {
                    ProjectId = projectId,
                    UserId = userId,
                    Type = ProjectUserType.PM
                };
                await WorkLimit.GetRepo<ProjectUser, long>().InsertAsync(projectUser);
            }
            else
            {
                userInProject.Type = ProjectUserType.PM;
                await WorkLimit.UpdateAsync(userInProject);
            }

            //var userHasRole = _userServices.UserHasRole(userId, StaticRoleNames.Host.ProjectAdmin);
            //if (!userHasRole)
            //{
            //    var roleId = _roleManager.GetRoleByNameAsync(StaticRoleNames.Host.ProjectAdmin).Result.Id;
            //    WorkLimit.Insert<UserRole>(new UserRole
            //    {
            //        RoleId = roleId,
            //        UserId = userId
            //    });
            //}

            return null;
        }
    }
}
