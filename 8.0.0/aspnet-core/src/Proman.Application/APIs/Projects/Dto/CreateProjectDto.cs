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
    public class CreateProjectDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public string CustomerName { get; set; }
        public int ProjectType { get; set; }
        public string EmailPM { get; set; }

        public int Status { get; set; }
    }
}
