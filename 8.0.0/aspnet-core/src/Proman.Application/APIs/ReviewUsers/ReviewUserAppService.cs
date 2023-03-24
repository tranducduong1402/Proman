using Abp.Application.Services.Dto;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proman.APIs.Positions.Dto;
using Proman.APIs.ReviewUsers.Dto;
using Proman.Authorization.Users;
using Proman.Constants.Enum;
using Proman.Entities;
using Proman.Extension;
using Proman.IIoc;
using Proman.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.ReviewUsers
{
    public class ReviewUserAppService : PromanAppServiceBase
    {
        public ReviewUserAppService(IWorkLimit workLimit) : base(workLimit) { }

        [HttpPost]
        public async Task<GridResult<ReviewUserDto>> GetAllPaging(GridParam input)
        {
            var query = WorkLimit.GetAll<ReviewUser>()
                .Select(s => new ReviewUserDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    Deadline = s.Deadline,
                    Status = s.Status,
                });

            return await query.GetGridResult(query, input);
        }

        private async System.Threading.Tasks.Task ValReviewUser(ReviewUserCreateEditDto input)
        {
            var isExistName = await WorkLimit.GetAll<ReviewUser>()
                 .Where(s => s.Name == input.Name).Where(s => s.Id != input.Id).AnyAsync();
            if (isExistName)
                throw new UserFriendlyException(string
                    .Format("Review user name {0} already existed", input.Name));

            var isExistTime = await WorkLimit.GetAll<ReviewUser>()
                 .Where(s => s.StartDate == input.StartDate && s.EndDate == input.EndDate && s.Deadline == input.Deadline)
                 .Where(s => s.Id != input.Id).AnyAsync();
             if (isExistTime)
                throw new UserFriendlyException(string
                    .Format("Review user name {0} already existed this month", input.Name));

            if (input.StartDate > input.EndDate)
                throw new UserFriendlyException(string
                    .Format("Start date cannot be greater than End date"));

            if (input.StartDate > input.Deadline)
                throw new UserFriendlyException(string
                    .Format("Start date cannot be greater than Deadline date"));
        }

        [HttpPost]
        public async Task<ReviewUserCreateEditDto> Create(ReviewUserCreateEditDto input)
        {
            await ValReviewUser(input);
            var item = ObjectMapper.Map<ReviewUser>(input);
            await WorkLimit.InsertAsync(item);

            return input;
        }

        [HttpPut]
        public async Task<ReviewUserCreateEditDto> Update(ReviewUserCreateEditDto input)
        {
            await ValReviewUser(input);
            var item = await WorkLimit.GetAsync<ReviewUser>(input.Id);
            ObjectMapper.Map<ReviewUserCreateEditDto, ReviewUser>(input, item);
            await WorkLimit.UpdateAsync(item);

            return input;
        }

        private async Task<ReviewUser> GetReviewUserById(long reviewUserId)
        {
            return await WorkLimit.GetAsync<ReviewUser>(reviewUserId);
        }

        [HttpPut]
        public async System.Threading.Tasks.Task ChangeStatus(EntityDto<long> input)
        {
            var hasClose = await WorkLimit.GetAll<ReviewUser>()
                .Where(x => x.Id == input.Id)
                .Where(x => x.Status == Constants.Enum.StatusEnum.ReviewUserStatus.Close).AnyAsync();

            if (hasClose)
                throw new UserFriendlyException(string.Format("Review user Id {0} has close", input.Id));

            var reviewUser = await GetReviewUserById(input.Id);
            var status1 = StatusEnum.ReviewUserStatus.New;
            var status2 = StatusEnum.ReviewUserStatus.InProgress;
            if (reviewUser.Status == status1)
            {
                status1 = StatusEnum.ReviewUserStatus.InProgress;
                reviewUser.Status = status1;
            }
            else if (reviewUser.Status == status2)
            {
                status2 = StatusEnum.ReviewUserStatus.Close;
                reviewUser.Status = status2;
            }
            
            await WorkLimit.UpdateAsync<ReviewUser>(reviewUser);
        }

        [HttpDelete]
        public async System.Threading.Tasks.Task Delete(EntityDto<long> input)
        {
            var hasRecord = await WorkLimit.GetAll<ReviewUser>().Where(x => x.Id == input.Id).AnyAsync();
            
            var hasStatusInProgressOrDone = await WorkLimit.GetAll<ReviewUser>()
                .Where(x => x.Status == Constants.Enum.StatusEnum.ReviewUserStatus.InProgress 
                || x.Status == Constants.Enum.StatusEnum.ReviewUserStatus.Close)
                .AnyAsync();

            if (!hasRecord)
                throw new UserFriendlyException(string.Format("There is no entity Review user with id = {0}!", input.Id));
            
            if (hasStatusInProgressOrDone)
                throw new UserFriendlyException(string.Format("Review user Id {0} has status in-progress or close", input.Id));
            
            await WorkLimit.GetRepo<Position>().DeleteAsync(input.Id);
        }
    }
}
