using Abp.Application.Services.Dto;
using Proman.Anotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.Users.Dto
{
    public class GetAllClientDto : EntityDto<long>
    {
        [ApplySearch]
        public string UserName { get; set; }
        [ApplySearch]
        public string EmailAddress { get; set; }
        public bool IsActive { get; set; }
        public string FullName { get; set; }
        public string UserCode { get; set; }
        //public string AvatarPath { get; set; }
        //public string AvatarFullPath => FileUtils.FullFilePath(AvatarPath);
        public Sex? Sex { get; set; }
        public DateTime CreationTime { get; set; }
        public int? ProjectCount { get; set; }
    }
}
