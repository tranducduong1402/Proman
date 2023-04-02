using Abp.Application.Services.Dto;
using Proman.Uitls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.Users.Dto
{
    public class GetUserDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public UserType? Type { get; set; }
        public UserLevel? Level { get; set; }
        public string UserCode { get; set; }
        //public string AvatarPath { get; set; }
        //public string AvatarFullPath => FileUtils.FullFilePath(AvatarPath);
        public long? PositionId { get; set; }
        public string PositionName { get; set; }
        public DateTime UpdatedAt => LastModifierTime.HasValue ? LastModifierTime.Value : CreationTime;
        public string UpdatedName => String.IsNullOrEmpty(LastModifierUserName) ? CreatedUserName : LastModifierUserName;
        public string CreatedUserName { get; set; }
        public string LastModifierUserName { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModifierTime { get; set; }
        public Sex? Sex { get; set; }
    }
}
