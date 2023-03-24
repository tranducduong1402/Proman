using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.ReviewUserDetails.Dto
{
    [AutoMapTo(typeof(ReviewUserDetail))]
    public class EditReviewUserDetailDto : Entity<long>
    {
        public long ProjectId { get; set; }
        public long PositionId { get; set; }
        public long? BranchId { get; set; }
        public UserType? UserType { get; set; }
        public UserLevel? UserLevel { get; set; }
        public double Point { get; set; }
        public string Note { get; set; }
    }
}
