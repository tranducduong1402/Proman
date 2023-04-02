using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Configuration;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proman.APIs.Projects.Dto;
using Proman.APIs.ReviewUsers.Dto;
using Proman.APIs.Tasks.Dto;
using Proman.Constants.Enum;
using Proman.Entities;
using Proman.Extension;
using Proman.IIoc;
using Proman.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Tasks
{
    public class TaskAppService : PromanAppServiceBase
    {
        public TaskAppService(IWorkLimit workLimit) : base(workLimit) { }

        [HttpPost]
        public async Task<GridResult<GetTaskDto>> GetAllPaging(GridParam input)
        {
            var query = WorkLimit.GetAll<Entities.Task>()
                .Select(s => new GetTaskDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Status = s.Status,
                    Description = s.Description,
                    ProjectName = s.Project.Name,
                    ProjectCode = s.Project.Code,
                    ProjectId = s.Project.Id,
                    UserId = s.UserId,
                    UserFullName = s.User.FullName,
                    UserEmailAddress = s.User.EmailAddress,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    OriginalEstimate = s.OriginalEstimate,
                    ParentId = s.ParentId,
                    Priority = s.Priority,
                    TaskPath = s.TaskPath,
                    Type = s.Type,
                    Title = s.Title,
                    TimeTrackingRemaining = s.TimeTrackingRemaining,
                    TimeTrackingSpent = s.TimeTrackingSpent 
                });

            return await query.GetGridResult(query, input);
        }

        [HttpPost]
        public async Task<CreateTaskDto> Create(CreateTaskDto input)
        {
            var task = ObjectMapper.Map<Entities.Task>(input);
            await WorkLimit.InsertAsync(task);
            return input;
        }

        [HttpPut]
        public async Task<CreateTaskDto> Update(CreateTaskDto input)
        {
            var item = await WorkLimit.GetAsync<Entities.Task>(input.Id);
            ObjectMapper.Map<CreateTaskDto, Entities.Task>(input, item);
            await WorkLimit.UpdateAsync(item);

            return input;
        }

        private async Task<Entities.Task> GetTaskById(long taskId)
        {
            return await WorkLimit.GetAsync<Entities.Task>(taskId);
        }

        [HttpDelete]
        public async System.Threading.Tasks.Task Delete(EntityDto<long> input)
        {
            var task = await GetTaskById(input.Id);
            if (task == default || task == null)
                throw new UserFriendlyException(string.Format("There is no entity task with id = {0}!", input.Id));

            if (task.Status == Constants.Enum.StatusEnum.TaskStatus.Done)
            {
                throw new UserFriendlyException("Cannot be deleted because the task status Done");
            }
            await WorkLimit.GetRepo<Entities.Task>().DeleteAsync(input.Id);
        }

        [HttpPut]
        public async System.Threading.Tasks.Task ChangeStatus(EntityDto<long> input)
        {
            var hasDone = await WorkLimit.GetAll<Entities.Task>()
                .Where(x => x.Id == input.Id)
                .Where(x => x.Status == StatusEnum.TaskStatus.Done).AnyAsync();

            if (hasDone)
                throw new UserFriendlyException(string.Format("Task Id {0} has Done", input.Id));

            //New = 0,
            //Approved = 1,
            //InProgress = 2,
            //Testing = 3,
            //CodeReview = 4,
            //Committed = 5,
            //Done = 6,

            var task = await GetTaskById(input.Id);

            var status0 = StatusEnum.TaskStatus.New;
            var status1 = StatusEnum.TaskStatus.Approved;
            var status2 = StatusEnum.TaskStatus.InProgress;
            var status3 = StatusEnum.TaskStatus.Testing;
            var status4 = StatusEnum.TaskStatus.CodeReview;
            var status5 = StatusEnum.TaskStatus.Committed;
            var status6 = StatusEnum.TaskStatus.Done;

            if (task.Status == status0)
            {
                status0 = status1;
                task.Status = status0;
            }
            else if (task.Status == status1)
            {
                status1 = status2;
                task.Status = status1;
            }
            else if (task.Status == status2)
            {
                status2 = status3;
                task.Status = status2;
            }
            else if (task.Status == status3)
            {
                status3 = status4;
                task.Status = status3;
            }
            else if (task.Status == status4)
            {
                status4 = status5;
                task.Status = status4;
            }
            else if (task.Status == status5)
            {
                status5 = status6;
                task.Status = status5;
            }

            await WorkLimit.UpdateAsync<Entities.Task>(task);
        }

        [HttpGet]
        public async Task<List<Dto.GetProjectCreateTaskDto>> GetAllProject()
        {
            return await WorkLimit.GetAll<Project>()
                .Where(s => s.Status != StatusEnum.ProjectStatus.Deactive)
                .Where(s => !s.IsDeleted)
                .Select(s => new Dto.GetProjectCreateTaskDto
                {
                    ProjectId = s.Id,
                    Name = s.Name,
                }).ToListAsync();
        }

        [HttpGet]
        public async Task<List<GetClientDto>> GetAllUserByProjectId(long projectId)
        {
            return await WorkLimit.GetAll<ProjectUser>()
                .Where(s => s.ProjectId == projectId)
                .Select(s => new GetClientDto
                {
                    ClientId = s.UserId,
                    EmailAddress = s.User.EmailAddress,
                    FullName = s.User.FullName,
                    UserName = s.User.UserName,
                }).ToListAsync();
        }
    }
}
