using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Users.Dto
{
    public class ProjectManagerDto : EntityDto<long>
    {
        public virtual string Surname { get; set; }
        public virtual string Name { get; set; }
    }
}
