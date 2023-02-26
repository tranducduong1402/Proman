using Abp.Application.Services;
using Proman.MultiTenancy.Dto;

namespace Proman.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

