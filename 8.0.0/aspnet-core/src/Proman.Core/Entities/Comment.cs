using Abp.Domain.Entities.Auditing;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Entities
{
    public class Comment : FullAuditedEntity<long>
    {
        public string Description { get; set; }
        public string ImagePath { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public long UserId { get; set; }

        [ForeignKey(nameof(TaskId))]
        public virtual Task Task { get; set; }
        public long? TaskId { get; set; }
    }
}
