using Abp;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Proman.IIoc
{
    public class WorkLimit : AbpServiceBase, IWorkLimit
    {
        private readonly IIocManager _iocManager;
        public WorkLimit(IIocManager iocManager)
        {
            _iocManager = iocManager;
        }
        IQueryable<TEntity> IWorkLimit.GetAll<TEntity, TPrimaryKey>()
        {
            return (this as IWorkLimit).GetRepo<TEntity, TPrimaryKey>().GetAll();
        }

        IQueryable<TEntity> IWorkLimit.GetAll<TEntity>()
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().GetAll();
        }

        IQueryable<TEntity> IWorkLimit.All<TEntity>()
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().GetAll();
        }

        IRepository<TEntity, TPrimaryKey> IWorkLimit.GetRepo<TEntity, TPrimaryKey>()
        {
            var repoType = typeof(IRepository<,>);
            Type[] typeArgs = { typeof(TEntity), typeof(TPrimaryKey) };
            var repoGenericType = repoType.MakeGenericType(typeArgs);
            var resolveMethod = _iocManager.GetType()
                .GetMethods()
                .First(s => s.Name == "Resolve" && !s.IsGenericMethod && s.GetParameters().Length == 1 && s.GetParameters()[0].ParameterType == typeof(Type));
            var repo = resolveMethod.Invoke(_iocManager, new object[] { repoGenericType });
            return repo as IRepository<TEntity, TPrimaryKey>;
        }

        IRepository<TEntity, long> IWorkLimit.GetRepo<TEntity>()
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>();
        }

        IRepository<TEntity, long> IWorkLimit.Repository<TEntity>()
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>();
        }

        TEntity IWorkLimit.Clone<TEntity>(TEntity entity)
        {
            entity.Id = 0;
            return (this as IWorkLimit).GetRepo<TEntity, long>().Insert(entity);
        }

        long IWorkLimit.CloneAndGetId<TEntity>(TEntity entity)
        {
            entity.Id = 0;
            return (this as IWorkLimit).GetRepo<TEntity, long>().InsertAndGetId(entity);
        }

        IEnumerable<TEntity> IWorkLimit.InsertRange<TEntity>(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                yield return (this as IWorkLimit).GetRepo<TEntity, long>().Insert(entity);
            }
        }

        async Task<IEnumerable<TEntity>> IWorkLimit.InsertRangeAsync<TEntity>(IEnumerable<TEntity> entities)
        {
            var updatedEntities = new List<TEntity>();
            foreach (var entity in entities)
            {
                updatedEntities.Add(await (this as IWorkLimit).GetRepo<TEntity, long>().InsertAsync(entity));
            }

            return updatedEntities;
        }

        public TEntity Insert<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().Insert(entity);
        }

        public async Task<TEntity> InsertAsync<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return await (this as IWorkLimit).GetRepo<TEntity, long>().InsertAsync(entity);
        }

        public long InsertAndGetId<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().InsertAndGetId(entity);
        }

        public async Task<long> InsertAndGetIdAsync<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return await (this as IWorkLimit).GetRepo<TEntity, long>().InsertAndGetIdAsync(entity);
        }


        public TEntity Update<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().Update(entity);
        }

        public async Task<TEntity> UpdateAsync<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return await (this as IWorkLimit).GetRepo<TEntity, long>().UpdateAsync(entity);
        }

        public long InsertOrUpdateAndGetId<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().InsertOrUpdateAndGetId(entity);
        }

        public async Task<long> InsertOrUpdateAndGetIdAsync<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            return await (this as IWorkLimit).GetRepo<TEntity, long>().InsertOrUpdateAndGetIdAsync(entity);
        }

        public void Delete<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            (this as IWorkLimit).GetRepo<TEntity, long>().Delete(entity);
        }

        public void Delete<TEntity>(long id) where TEntity : class, IEntity<long>
        {
            (this as IWorkLimit).GetRepo<TEntity, long>().Delete(id);
        }

        public async Task DeleteAsync<TEntity>(TEntity entity) where TEntity : class, IEntity<long>
        {
            await (this as IWorkLimit).GetRepo<TEntity, long>().DeleteAsync(entity);
        }

        public async Task DeleteAsync<TEntity>(long id) where TEntity : class, IEntity<long>
        {
            await (this as IWorkLimit).GetRepo<TEntity, long>().DeleteAsync(id);
        }

        public void SoftDelete<TEntity>(TEntity entity) where TEntity : class, IEntity<long>, ISoftDelete
        {
            entity.IsDeleted = true;
            (this as IWorkLimit).GetRepo<TEntity, long>().Update(entity);
        }

        public async Task SoftDeleteAsync<TEntity>(TEntity entity) where TEntity : class, IEntity<long>, ISoftDelete
        {
            entity.IsDeleted = true;
            await (this as IWorkLimit).GetRepo<TEntity, long>().UpdateAsync(entity);
        }

        public TEntity Get<TEntity>(long id) where TEntity : class, IEntity<long>
        {
            return (this as IWorkLimit).GetRepo<TEntity, long>().Get(id);
        }

        public async Task<TEntity> GetAsync<TEntity>(long id) where TEntity : class, IEntity<long>
        {
            return await (this as IWorkLimit).GetRepo<TEntity, long>().GetAsync(id);
        }

        IEnumerable<TEntity> IWorkLimit.UpdateRange<TEntity>(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                yield return (this as IWorkLimit).GetRepo<TEntity, long>().Update(entity);
            }
        }

        async Task<IEnumerable<TEntity>> IWorkLimit.UpdateRangeAsync<TEntity>(IEnumerable<TEntity> entities)
        {
            var updatedEntities = new List<TEntity>();
            foreach (var entity in entities)
            {
                updatedEntities.Add(await (this as IWorkLimit).GetRepo<TEntity, long>().UpdateAsync(entity));
            }

            return updatedEntities;
        }

        Task<IEnumerable<TEntityDto>> IWorkLimit.Sync<TEntityDto, TEntity>(IEnumerable<TEntityDto> input)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<TEntityDto>> IWorkLimit.Sync<TEntityDto, TEntity>(IEnumerable<TEntityDto> input, Expression<Func<TEntity, bool>> condition)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<TEntityDto>> IWorkLimit.Sync<TEntityDto, TEntity>(IEnumerable<TEntityDto> input, Expression<Func<TEntity, bool>> condition, Func<TEntityDto, TEntityDto> merge)
        {
            throw new NotImplementedException();
        }

        Task IWorkLimit.DeleteRangeAsync<TEntity>(List<TEntity> entities)
        {
            throw new NotImplementedException();
        }

        //public async Task<IEnumerable<TEntityDto>> Sync<TEntityDto, TEntity>(IEnumerable<TEntityDto> input)
        //    where TEntity : class, IEntity<long>
        //    where TEntityDto : class, IEntityDto<long?>
        //{
        //    return await Sync<TEntityDto, TEntity>(input, x => false, x => x);
        //}
        //public async Task<IEnumerable<TEntityDto>> Sync<TEntityDto, TEntity>(IEnumerable<TEntityDto> input, Expression<Func<TEntity, bool>> condition)
        //    where TEntity : class, IEntity<long>
        //    where TEntityDto : class, IEntityDto<long?>
        //{
        //    return await Sync<TEntityDto, TEntity>(input, condition, x => x);
        //}

        //public async Task<IEnumerable<TEntityDto>> Sync<TEntityDto, TEntity>(
        //    IEnumerable<TEntityDto> input,
        //    Expression<Func<TEntity, bool>> condition,
        //    Func<TEntityDto, TEntityDto> merge
        //)
        //    where TEntity : class, IEntity<long>
        //    where TEntityDto : class, IEntityDto<long?>
        //{
        //    var repo = (this as IWorkLimit).GetRepo<TEntity, long>();
        //    if (input == null)
        //    {
        //        await repo.DeleteAsync(condition);
        //        return null;
        //    }

        //    var currentItems = await repo.GetAll().Where(condition).ToListAsync();
        //    var newItems = input.ToList();
        //    foreach (var item in currentItems)
        //    {
        //        var newItem = newItems.FirstOrDefault(t => item.Id == t.Id);
        //        if (newItem != null)
        //        {
        //            newItem = merge(newItem);
        //            Mapper.Map(newItem, item);
        //            repo.Update(item);
        //        }
        //        else
        //        {
        //            repo.Delete(item);
        //        }
        //    }
        //    foreach (var item in newItems.Where(s => !s.Id.HasValue))
        //    {
        //        var newItem = item;
        //        newItem = merge(newItem);
        //        item.Id = await repo.InsertAndGetIdAsync(Mapper.Map<TEntity>(newItem));
        //    }

        //    return newItems;
        //}
        //public async Task DeleteRangeAsync<TEntity>(List<TEntity> entities) where TEntity : class, IEntity<long>
        //{
        //    var entityType = typeof(TEntity);
        //    var isDeleted = entityType.GetProperty("IsDeleted");
        //    //var deleterUserId = entityType.GetProperty("DeleterUserId");
        //    var deletionTime = entityType.GetProperty("DeletionTime");
        //    foreach (var entity in entities)
        //    {
        //        isDeleted.SetValue(entity, true);
        //        deletionTime.SetValue(entity, DateTimeUtils.GetNow());
        //        //deleterUserId.SetValue(entity, AbpSession.UserId);
        //    }
        //}
    }
}
