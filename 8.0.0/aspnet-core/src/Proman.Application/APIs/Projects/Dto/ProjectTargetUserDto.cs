using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Projects.Dto
{
    [AutoMapTo(typeof(ProjectTargetUser))]
    public class ProjectTargetUserDto : Entity<long>
    {
        public long UserId { get; set; }
        public string RoleName { get; set; }
    }
}
