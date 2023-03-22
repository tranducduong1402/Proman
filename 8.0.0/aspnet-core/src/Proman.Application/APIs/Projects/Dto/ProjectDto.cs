using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.Projects.Dto
{
    [AutoMapTo(typeof(Project))]
    public class ProjectDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public ProjectStatus Status { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public string Note { get; set; }
        public ProjectType ProjectType { get; set; }
        public long CustomerId { get; set; }
        public List<ProjectUsersDto> Users { get; set; }
        public List<ProjectTargetUserDto> ProjectTargetUsers { get; set; }
    }
}
