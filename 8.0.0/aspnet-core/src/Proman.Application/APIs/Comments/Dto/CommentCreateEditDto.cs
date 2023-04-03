using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.AspNetCore.Http;
using Proman.Entities;

namespace Proman.APIs.Comments.Dto
{
    [AutoMapTo(typeof(Comment))]
    public class CommentCreateEditDto : EntityDto<long>
    {
        public IFormFile? FormFile { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public long UserId { get; set; }
        public long? TaskId { get; set; }
    }
}
