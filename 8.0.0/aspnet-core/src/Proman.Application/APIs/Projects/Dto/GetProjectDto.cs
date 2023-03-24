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
        public string Name { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public ProjectStatus Status { get; set; }
        public string Code { get; set; }
        public ProjectType ProjectType { get; set; }
        public string Note { get; set; }
        public long CustomerId { get; set; }
        public string CustomerFullname { get; set; }
        public string CustomerEmailAddress { get; set; }
        public DateTime UpdatedAt => LastModifierTime.HasValue ? LastModifierTime.Value : CreationTime;
        public string UpdatedName => String.IsNullOrEmpty(LastModifierUserName) ? CreatedUserName : LastModifierUserName;
        public string CreatedUserName { get; set; }
        public string LastModifierUserName { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModifierTime { get; set; }
    }
}
