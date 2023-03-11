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
    public class ReviewUserDetail : FullAuditedEntity<long>
    {
        [ForeignKey(nameof(ReviewUserId))]
        public virtual ReviewUser ReviewUser { get; set; }

        public long? ReviewUserId { get; set; }

        public float Point { get; set; }

        public string Note { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public long UserId { get; set; }

        public UserType UserType { get; set; }
        public UserLevel UserLevel { get; set; }

        [ForeignKey(nameof(PositionId))]
        public virtual Position Position { get; set; }

        public long? PositionId { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; }

        public long? ProjectId { get; set; }
    }
}
