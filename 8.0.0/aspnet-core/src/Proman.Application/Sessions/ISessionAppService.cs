using System.Threading.Tasks;
using Abp.Application.Services;
using Proman.Sessions.Dto;

namespace Proman.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
