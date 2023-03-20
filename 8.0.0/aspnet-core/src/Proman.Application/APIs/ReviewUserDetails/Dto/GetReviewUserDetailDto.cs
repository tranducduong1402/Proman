using Abp.Domain.Entities;
using Proman.Anotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.ReviewUserDetails.Dto
{
    public class GetReviewUserDetailDto : Entity<long>
    {
        [ApplySearch]
        public string FullName { get; set; }
        [ApplySearch]
        public string EmailAddress { get; set; }
        [ApplySearch]
        public string ProjectName { get; set; }
        public long ProjectId { get; set; }
        public string PositionName { get; set; }
        public long PositionId { get; set; }
        public long? BranchId { get; set; }
        public long? UserBranchId { get; set; }
        public string BranchColor { get; set; }
        public string UserBranchColor { get; set; }
        public string BranchName { get; set; }
        public string UserBranchName { get; set; }
        public UserType? Type { get; set; }
        public UserType? UserType { get; set; }
        public UserLevel? Level { get; set; }
        public UserLevel? UserLevel { get; set; }
        public double Point { get; set; }
        public string Note { get; set; }
        public string RetroName { get; set; }
        public DateTime UpdatedAt => LastModifierTime.HasValue ? LastModifierTime.Value : CreationTime;
        public string UpdatedName => String.IsNullOrEmpty(LastModifierUserName) ? CreatedUserName : LastModifierUserName;
        public string CreatedUserName { get; set; }
        public string LastModifierUserName { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModifierTime { get; set; }
        public long UserId { get; set; }
    }
}
