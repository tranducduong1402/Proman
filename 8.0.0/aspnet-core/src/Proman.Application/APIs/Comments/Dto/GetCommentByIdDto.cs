using Abp.Application.Services.Dto;
using Proman.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Comments.Dto
{
    public class GetCommentByIdDto : EntityDto<long>
    {
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string EmailAddress { get; set; }
        public long? TaskId { get; set; }
    }
}
