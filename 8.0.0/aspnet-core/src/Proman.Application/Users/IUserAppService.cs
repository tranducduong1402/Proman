using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Proman.DomainServices.Dto;
using Proman.Paging;
using Proman.Roles.Dto;
using Proman.Users.Dto;
using CreateUserDto = Proman.DomainServices.Dto.CreateUserDto;

namespace Proman.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task DeActivate(EntityDto<long> user);
        Task Activate(EntityDto<long> user);
        Task<ListResultDto<RoleDto>> GetRoles();
        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<bool> ChangePassword(ChangePasswordDto input);
    }
}
