using Abp.Application.Services.Dto;
using Proman.Anotations;
using Proman.Uitls;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.Users.Dto
{
    public class GetAllUserDto : EntityDto<long>
    {
        [ApplySearch]
        public string UserName { get; set; }
        [ApplySearch]
        public string EmailAddress { get; set; }
        public bool IsActive { get; set; }
        [ApplySearch]
        public string FullName { get; set; }
        public List<int> RoleId { get; set; }
        public List<string> RoleNames { get; set; }
        public UserType? Type { get; set; }
        public string UserCode { get; set; }
        public UserLevel? Level { get; set; }
        //public string AvatarPath { get; set; }
        //public string AvatarFullPath => FileUtils.FullFilePath(AvatarPath);
        //public long? ManagerId { get; set; }
        //public string ManagerAvatarPath { get; set; }
        //public string ManagerAvatarFullPath => FileUtils.FullFilePath(ManagerAvatarPath);
        //public string ManagerName { get; set; }
        public Sex? Sex { get; set; }
        public DateTime CreationTime { get; set; }
        public long? PositionId { get; set; }
        public string PositionName { get; set; }
    }
}
