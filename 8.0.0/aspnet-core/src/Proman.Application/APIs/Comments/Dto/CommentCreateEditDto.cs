using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Proman.Authorization.Users;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Comments.Dto
{
    [AutoMapTo(typeof(Comment))]
    public class CommentCreateEditDto : EntityDto<long>
    {
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public long UserId { get; set; }
        public long? TaskId { get; set; }
    }
}
