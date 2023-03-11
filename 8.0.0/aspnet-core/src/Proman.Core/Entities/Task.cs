using Abp.Domain.Entities.Auditing;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.Entities
{
    public class Task : FullAuditedEntity<long>
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
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public long UserId { get; set; }
        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; }
        public long? ProjectId { get; set; }
    }
}
