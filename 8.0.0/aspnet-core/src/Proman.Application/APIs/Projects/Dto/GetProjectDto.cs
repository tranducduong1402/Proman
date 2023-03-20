using Abp.Domain.Entities;
using Castle.Core.Resource;
using Proman.Anotations;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.Projects.Dto
{
    public class GetProjectDto : Entity<long>
    {
        [ApplySearch]
        public string Name { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public ProjectStatus Status { get; set; }
        [ApplySearch]
        public string Code { get; set; }
        public ProjectType ProjectType { get; set; }
        public string Note { get; set; }
        public long CustomerId { get; set; }
        [ApplySearch]
        public string CustomerFullName { get; set; }
        [ApplySearch]
        public string CustomerEmailAddress { get; set; }
    }
}
