using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Proman.Anotations;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.DomainServices.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserDto : EntityDto<long>
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }  

        public bool IsActive { get; set; }
        public string FullName { get; set; }
        public string[] RoleNames { get; set; }
        public UserType? Type { get; set; }
        public DateTime? StartDateAt { get; set; }
        [ApplySearchAttribute]
        [MaxLength(256)]
        public string UserCode { get; set; }
        public UserLevel? Level { get; set; }
        public long? ManagerId { get; set; }
        public Sex? Sex { get; set; }
        public string AvatarPath { get; set; }
        public bool IsStopWork { get; set; }
        public UserLevel? BeginLevel { get; set; }
        public DateTime? EndDateAt { get; set; }
        public long? PositionId { get; set; }
        public string PositionName { get; set; }
    }
}
