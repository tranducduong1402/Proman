using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Users;
using Abp.Extensions;
using static Proman.Constants.Enum.StatusEnum;
using Proman.Entities;

namespace Proman.Authorization.Users
{
    public class User : AbpUser<User>
    {
        public const string DefaultPassword = "123qwe";

        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = AdminUserName,
                Surname = AdminUserName,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }

        public string Address { get; set; }
        public UserType? Type { get; set; }
        public DateTime? StartDateAt { get; set; }
        [MaxLength(256)]
        public string UserCode { get; set; }
        public long? ManagerId { get; set; }
        [ForeignKey(nameof(ManagerId))]
        public virtual User Manager { get; set; }
        public UserLevel? Level { get; set; }
        public string AvatarPath { get; set; }
        public Sex? Sex { get; set; }
        public bool IsStopWork { get; set; }
        public long? PositionId { get; set; }
        [ForeignKey(nameof(PositionId))]
        public virtual Position Position { get; set; }
        public UserLevel? BeginLevel { get; set; }
    }
}
