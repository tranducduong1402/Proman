using Microsoft.AspNetCore.Mvc;
using Proman.APIs.Positions.Dto;
using Proman.Entities;
using Proman.Extension;
using Proman.IIoc;
using Proman.Paging;
using System.Threading.Tasks;
using System.Linq;
using Abp.UI;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.Application.Services.Dto;
using Proman.Authorization.Users;
using System;

namespace Proman.APIs.Positions
{
    public class PositionAppService : PromanAppServiceBase
    {
        public PositionAppService(IWorkLimit workLimit) : base(workLimit) { }

        [HttpPost]
        public async Task<GridResult<PositionDto>> GetAllPaging(GridParam input)
        {
            var query = WorkLimit.GetAll<Position>()
                 .Select(s => new PositionDto { Id = s.Id, Name = s.Name, ShortName = s.ShortName, Code = s.Code, Color = s.Color, });
            return await query.GetGridResult(query, input);
        }

        private async System.Threading.Tasks.Task ValPosition(PositionCreateEditDto input)
        {
            var isExistName = await WorkLimit.GetAll<Position>()
                 .Where(s => s.Name == input.Name).Where(s => s.Id != input.Id).AnyAsync();
            if (isExistName)
                throw new UserFriendlyException(string
                    .Format("Position name {0} already existed", input.Name));

            var isExistShortName = await WorkLimit.GetAll<Position>()
                 .Where(s => s.ShortName == input.ShortName).Where(s => s.Id != input.Id).AnyAsync();
            if (isExistShortName)
                throw new UserFriendlyException(string
                    .Format("Short name {0} already existed", input.ShortName));

            var isExistCode = await WorkLimit.GetAll<Position>()
                 .Where(s => s.Code == input.Code).Where(s => s.Id != input.Id).AnyAsync();
            if (isExistCode)
                throw new UserFriendlyException(string
                    .Format("Code {0} already existed", input.Code));
        }

        [HttpPost]
        public async Task<PositionCreateEditDto> Create(PositionCreateEditDto input)
        {
            await ValPosition(input);
            var item = ObjectMapper.Map<Position>(input);
            await WorkLimit.InsertAsync(item);

            return input;
        }

        [HttpPut]
        public async Task<PositionCreateEditDto> Update(PositionCreateEditDto input)
        {
            await ValPosition(input);
            var item = await WorkLimit.GetAsync<Position>(input.Id);
            ObjectMapper.Map<PositionCreateEditDto, Position>(input, item);
            await WorkLimit.UpdateAsync(item);

            return input;
        }

        [HttpDelete]
        public async System.Threading.Tasks.Task Delete(EntityDto<long> input)
        {
            var hasRecord = await WorkLimit.GetAll<Position>().Where(x => x.Id == input.Id).AnyAsync();
            var hasUser = await WorkLimit.GetAll<User>().AnyAsync(s => s.PositionId == input.Id);
            if (!hasRecord)
                throw new UserFriendlyException(string.Format("There is no entity Position with id = {0}!", input.Id));
            if (hasUser)
                throw new UserFriendlyException(String.Format("Position Id {0} has user", input.Id));
            await WorkLimit.GetRepo<Position>().DeleteAsync(input.Id);
        }

        [HttpGet]
        public async Task<PositionDto> GetPositionById(EntityDto<long> input)
        {
            var query = await WorkLimit.GetAll<Position>()
                .Where(s => s.Id == input.Id)
                 .Select(s => new PositionDto { 
                     Id = s.Id, 
                     Name = s.Name, 
                     ShortName = s.ShortName, 
                     Code = s.Code, 
                     Color = s.Color, 
                 }).FirstOrDefaultAsync();
            return query;
        }
    }
}
