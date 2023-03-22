using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.Projects.Dto
{
    [AutoMapTo(typeof(ProjectUser))]
    public class ProjectUsersDto : Entity<long>
    {
        public long UserId { get; set; }
        public ProjectUserType Type { get; set; }
        public bool IsTemp { get; set; }
    }
}
