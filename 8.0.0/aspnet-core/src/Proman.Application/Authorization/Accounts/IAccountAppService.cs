using System.Threading.Tasks;
using Abp.Application.Services;
using Proman.Authorization.Accounts.Dto;

namespace Proman.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
