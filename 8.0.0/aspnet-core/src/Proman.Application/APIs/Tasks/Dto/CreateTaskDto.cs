using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Authorization.Users;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.Tasks.Dto
{
    [AutoMapTo(typeof(Entities.Task))]
    public class CreateTaskDto : Entity<long> 
    {
        public string Title { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public TaskType Type { get; set; }
        public Constants.Enum.StatusEnum.TaskStatus Status { get; set; }
        public PriorityType Priority { get; set; }
        public float? TimeTrackingSpent { get; set; }
        public float? TimeTrackingRemaining { get; set; }
        public float? OriginalEstimate { get; set; }
        public long? ParentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string TaskPath { get; set; }
        public long UserId { get; set; }
        public long? ProjectId { get; set; }
    }
}
