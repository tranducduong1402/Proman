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
    public class ProjectUser : FullAuditedEntity<long>
    {
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public long UserId { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; }
        public long? ProjectId { get; set; }

        public ProjectUserType Type { get; set; }
        public bool IsTemp { get; set; }
    }
}
