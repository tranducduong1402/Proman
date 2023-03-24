using Abp.Domain.Services;
using Proman.Authorization.Users;
using Proman.DomainServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.DomainServices
{
    public interface IUserServices : IDomainService
    {
        IQueryable<User> GetUserByRole(string roleName);
        bool UserHasRole(long userId, string roleName);
        IQueryable<string> UserAllRoles(long userId);
        Task<User> CreateUserAsync(CreateUserDto input);
        Task<UserDto> UpdateUserAsync(UserDto input);
        Task<long?> GetUserIdByEmail(string email);
    }
}
