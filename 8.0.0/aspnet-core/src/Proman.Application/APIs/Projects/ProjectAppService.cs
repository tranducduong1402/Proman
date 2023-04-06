using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Collections.Extensions;
using Abp.UI;
using Castle.Core.Resource;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proman.APIs.Projects.Dto;
using Proman.APIs.ReviewUsers.Dto;
using Proman.Authorization.Roles;
using Proman.Authorization.Users;
using Proman.Constants.Enum;
using Proman.DomainServices;
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
            var dicUsers = WorkLimit.GetAll<User>()
                                    .Select(s => new
                                    {
                                        s.Id,
                                        s.FullName,
                                    }).ToDictionary(s => s.Id, s => s.FullName);

            var query = WorkLimit.GetAll<Project>()
                .Where(s => !s.IsDeleted)
                .Select(s => new GetProjectDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Code = s.Code,
                    ProjectType = s.ProjectType,
                    Status = s.Status,
                    TimeStart = s.TimeStart,
                    TimeEnd = s.TimeEnd,
                    LastModifierTime = s.LastModificationTime,
                    CreationTime = s.CreationTime,
                    CreatedUserName = (s.CreatorUserId.HasValue && dicUsers.ContainsKey(s.CreatorUserId.Value)) ? dicUsers[s.CreatorUserId.Value] : "",
                    LastModifierUserName = (s.LastModifierUserId.HasValue && dicUsers.ContainsKey(s.LastModifierUserId.Value)) ? dicUsers[s.LastModifierUserId.Value] : "",
                });

            return await query.GetGridResult(query, input);
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
        public async Task<ProjectDto> AddNew(ProjectDto input)
        {
            var isExistsName = await WorkLimit.GetAll<Project>().AnyAsync(s => s.Name == input.Name && s.Id != input.Id);
            if (isExistsName)
            {
                throw new UserFriendlyException(string.Format("Project name:{0} is exists", input.Name));
            }

            var isExistsCode = await WorkLimit.GetAll<Project>().AnyAsync(s => s.Code == input.Code && s.Id != input.Id);
            if (isExistsCode)
            {
                throw new UserFriendlyException(string.Format("Project code:{0} is exists", input.Code));
            }

            var hasProjectAdmin = input.Users.Any(s => s.Type == ProjectUserType.PM);
            if (!hasProjectAdmin)
            {
                throw new Exception(string.Format("Project must have at least one project manager"));
            }

            if (input.TimeEnd.HasValue && input.TimeStart.Date > input.TimeEnd.Value.Date)
            {
                throw new UserFriendlyException("Start time cannot be greater than end time !");
            }

            if (input.Id <= 0)//insert 3 bang project, projectTask, projectUser
            {
                var project = ObjectMapper.Map<Project>(input);
                input.Id = await WorkLimit.GetRepo<Project, long>().InsertAndGetIdAsync(project);
                CurrentUnitOfWork.SaveChanges();

                //insert projectUser
                foreach (var pUserDto in input.Users)
                {
                    var projectUser = new ProjectUser
                    {
                        ProjectId = input.Id,
                        UserId = pUserDto.UserId,
                        Type = pUserDto.Type,
                        IsTemp = pUserDto.IsTemp
                    };
                    await WorkLimit.GetRepo<ProjectUser, long>().InsertAsync(projectUser);
                }

                if (input.ProjectTargetUsers != null)
                {
                    foreach (var pTargetUserDto in input.ProjectTargetUsers)
                    {
                        var projectTargetUser = new ProjectTargetUser
                        {
                            ProjectId = input.Id,
                            UserId = pTargetUserDto.UserId,
                            RoleName = pTargetUserDto.RoleName
                        };
                        await WorkLimit.GetRepo<ProjectTargetUser, long>().InsertAsync(projectTargetUser);
                    }
                }
            }
            return input;
        }

        [HttpPost]
        public async Task<ProjectDto> Edit(ProjectDto input)
        {
            if (input.Id > 0) //edit
            {
                var project = await WorkLimit.GetAsync<Project>(input.Id);
                ObjectMapper.Map<ProjectDto, Project>(input, project);
                await WorkLimit.GetRepo<Project, long>().UpdateAsync(project);

                //ProjectUser
                var currentProjectUsers = await WorkLimit.GetAll<ProjectUser>()
                    .Where(s => s.ProjectId == input.Id).ToListAsync();

                var currentUserIds = currentProjectUsers.Select(s => s.UserId).ToList();

                var newUserIds = input.Users.Select(s => s.UserId).ToList();

                var insertUsers = input.Users.Where(x => !currentUserIds.Contains(x.UserId));

                var deleteProjectUserIds = currentProjectUsers
                    .Where(s => !newUserIds.Contains(s.UserId))
                    .Select(s => s.Id).ToList();

                var updateUsers = (from cpu in currentProjectUsers
                                   join cu in input.Users on cpu.UserId equals cu.UserId
                                   select new
                                   {
                                       ProjectUser = cpu,
                                       Dto = cu
                                   }).ToList();

                foreach (var id in deleteProjectUserIds)
                {
                    await WorkLimit.DeleteAsync<ProjectUser>(id);
                }

                foreach (var pUserDto in insertUsers)
                {
                    var projectUser = ObjectMapper.Map<ProjectUser>(pUserDto);
                    projectUser.ProjectId = input.Id;
                    await WorkLimit.InsertAsync<ProjectUser>(projectUser);
                }

                foreach (var item in updateUsers)
                {
                    if (item.Dto.Type != item.ProjectUser.Type || item.Dto.IsTemp != item.ProjectUser.IsTemp)
                    {
                        item.ProjectUser.Type = item.Dto.Type;
                        item.ProjectUser.IsTemp = item.Dto.IsTemp;

                        await WorkLimit.UpdateAsync<ProjectUser>(item.ProjectUser);
                    }
                }

                //ProjectTargetUser

                var currentProjectTargetUsers = await WorkLimit.GetAll<ProjectTargetUser>()
               .Where(s => s.ProjectId == input.Id).ToListAsync();

                var currentTargetUserIds = currentProjectTargetUsers.Select(s => s.UserId).ToList();

                var newTargetUserIds = input.ProjectTargetUsers.Select(s => s.UserId).ToList();

                var deleteTargetUserIds = currentTargetUserIds.Except(newTargetUserIds);

                var insertProjectTargetUsers = input.ProjectTargetUsers.Where(x => !currentTargetUserIds.Contains(x.UserId));

                var deleteProjectTargetUserIds = currentProjectTargetUsers
                    .Where(s => !newTargetUserIds.Contains(s.UserId)).Select(s => s.Id).ToList();

                var updateProjectTargetUsers = (from cpu in currentProjectTargetUsers
                                                join cu in input.ProjectTargetUsers on cpu.UserId equals cu.UserId
                                                select new
                                                {
                                                    ProjectTargetUser = cpu,
                                                    Dto = cu
                                                }).ToList();

                foreach (var id in deleteProjectTargetUserIds)
                {
                    await WorkLimit.DeleteAsync<ProjectTargetUser>(id);
                }

                foreach (var pTargetUserDto in insertProjectTargetUsers)
                {
                    var projectTargetUser = ObjectMapper.Map<ProjectTargetUser>(pTargetUserDto);
                    projectTargetUser.ProjectId = input.Id;
                    await WorkLimit.InsertAsync<ProjectTargetUser>(projectTargetUser);
                }

                foreach (var item in updateProjectTargetUsers)
                {
                    if (item.Dto.RoleName != item.ProjectTargetUser.RoleName)
                    {
                        item.ProjectTargetUser.RoleName = item.Dto.RoleName;
                        await WorkLimit.UpdateAsync<ProjectTargetUser>(item.ProjectTargetUser);
                    }
                }
            }
            return input;
        }

        private async Task<Project> GetProjectById(long projectId)
        {
            return await WorkLimit.GetAsync<Project>(projectId);
        }

        [HttpPut]
        public async System.Threading.Tasks.Task ChangeStatus(EntityDto<long> input)
        {
            var project = await GetProjectById(input.Id);
            var status = ProjectStatus.Active;
            if (project.Status == status)
            {
                status = ProjectStatus.Deactive;
                project.Status = status;
            }

            project.Status = status;

            await WorkLimit.UpdateAsync<Project>(project);
        }

        [HttpGet]
        public async Task<List<GetUserByProjectIdDto>> GetUserByProjectId(EntityDto<long> input)
        {
            return await WorkLimit.GetAll<ProjectUser>()
                .Where(s => s.ProjectId == input.Id)
                .Select(s => new GetUserByProjectIdDto
                {
                    UserId = s.UserId,
                    FullName = s.User.FullName,
                    EmailAddress = s.User.EmailAddress,
                    Type = s.Type,
                }).ToListAsync();
        }

        [HttpGet]
        public async Task<List<GetTaskByProjectIdDto>> GetTaskByProjectId(EntityDto<long> input)
        {
            return await WorkLimit.GetAll<Entities.Task>()
                .Where(s => s.ProjectId == input.Id)
                .Select(s => new GetTaskByProjectIdDto
                {
                    Title = s.Title,
                    Name = s.Name,
                    Description = s.Description,
                    Type = s.Type,
                    Status = s.Status,
                    Priority = s.Priority,
                    UserId = s.UserId,
                    FullName = s.User.FullName,
                    EmailAddress = s.User.EmailAddress,
                }).ToListAsync();
        }

        [HttpGet]
        public async Task<List<GetClientDto>> GetAllClient()
        {
            return await WorkLimit.GetAll<User>()
                .Where(s => s.Type == UserType.Client)
                .Select(s => new GetClientDto
                {
                    ClientId = s.Id,
                    EmailAddress = s.EmailAddress,
                    FullName = s.FullName,
                    UserName = s.UserName,
                }).ToListAsync();
        }

        [HttpGet]
        public async Task<List<GetClientDto>> GetAllUser()
        {
            return await WorkLimit.GetAll<User>()
                .Where(s => s.Type != UserType.Client)
                .Select(s => new GetClientDto
                {
                    ClientId = s.Id,
                    EmailAddress = s.EmailAddress,
                    FullName = s.FullName,
                    UserName = s.UserName,
                }).ToListAsync();
        }
    }
}
