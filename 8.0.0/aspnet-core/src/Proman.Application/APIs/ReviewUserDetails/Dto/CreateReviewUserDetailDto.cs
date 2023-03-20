using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.ReviewUserDetails.Dto
{
    [AutoMapTo(typeof(ReviewUserDetail))]
    public class CreateReviewUserDetailDto : Entity<long>
    {
        public double Point { get; set; }
        public string Note { get; set; }
        public long UserId { get; set; }
        public long ProjectId { get; set; }
        public long PositionId { get; set; }
        public long RetroId { get; set; }
    }
}
