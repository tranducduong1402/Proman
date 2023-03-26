using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Users.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UpdateRoleDto : EntityDto<long>
    {
        public string[] RoleNames { get; set; }
    }
}
