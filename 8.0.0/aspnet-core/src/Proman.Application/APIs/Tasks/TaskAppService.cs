using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Proman.APIs.Projects.Dto;
using Proman.APIs.Tasks.Dto;
using Proman.Constants.Enum;
using Proman.Entities;
using Proman.Extension;
using Proman.IIoc;
using Proman.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async System.Threading.Tasks.Task ChangeStatus(EntityDto<long> input, TaskStatus inputStatus)
        {
            var task = await GetTaskById(input.Id);
            task.Status = (StatusEnum.TaskStatus)inputStatus;
            await WorkLimit.UpdateAsync<Entities.Task>(task);
        }
    }
}
