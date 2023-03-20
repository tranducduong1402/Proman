using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Projects.Dto
{
    [AutoMapTo(typeof(Project))]
    public class UserJoinProjectDto : EntityDto<long>
    {
        public string ProjectCode { get; set; }
        public string EmailAddress { get; set; }
        public bool IsPool { get; set; }
        public int Role { get; set; }
        public DateTime StartDate { get; set; }
        public string PMEmail { get; set; }
    }
}
