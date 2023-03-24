﻿using Abp.AutoMapper;
using Abp.Runtime.Validation;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.DomainServices.Dto
{
    [AutoMapTo(typeof(User))]
    public class CreateUserDto : IShouldNormalize
    {
        public long Id { get; set; }
        public string UserName { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string EmailAddress { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }

        public string[] RoleNames { get; set; }

        public string Password { get; set; }
        public UserType? Type { get; set; }
        public UserLevel? Level { get; set; }
        public DateTime? StartDateAt { get; set; }
        public string UserCode { get; set; }
        public void Normalize()
        {
            if (RoleNames == null)
            {
                RoleNames = new string[0];
            }
        }
        public long? ManagerId { get; set; }
        public Sex? Sex { get; set; }
        public string AvatarPath { get; set; }
        public UserLevel? BeginLevel { get; set; }
        public DateTime? EndDateAt { get; set; }
        public long? PositionId { get; set; }
    }
}
