using Abp.Domain.Entities.Auditing;
using Castle.Core.Resource;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;
using Proman.Authorization.Users;

namespace Proman.Entities
{
    public class Project : FullAuditedEntity<long>
    {
        public string Name { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public ProjectStatus Status { get; set; }
        public string Code { get; set; }
        public ProjectType ProjectType { get; set; }
        public string Note { get; set; }

        [ForeignKey(nameof(CustomerId))]
        public virtual User Customer { get; set; }
        public long CustomerId { get; set; }
    }
}
