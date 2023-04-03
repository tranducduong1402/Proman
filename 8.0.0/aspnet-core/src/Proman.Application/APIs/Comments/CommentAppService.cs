﻿using Abp.Application.Services.Dto;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proman.APIs.Comments.Dto;
using Proman.Entities;
using Proman.IIoc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.IO;

namespace Proman.APIs.Comments
{
    public class CommentAppService : PromanAppServiceBase
    {
        private readonly Cloudinary _cloudinary;
        public CommentAppService(IWorkLimit workLimit, Cloudinary cloudinary) : base(workLimit) 
        {
            _cloudinary = cloudinary;
        }

        [HttpPost]
        public async Task<CommentCreateEditDto> Create(CommentCreateEditDto input, IFormFile inputfile)
        {
            var userId = AbpSession.UserId.Value;
            var item = ObjectMapper.Map<Comment>(input);
            item.ImagePath = await UploadImageComment(input.FormFile);
            item.UserId = userId;
            await WorkLimit.InsertAsync(item);

            return input;
        }

        [HttpPut]
        public async Task<CommentCreateEditDto> Update(CommentCreateEditDto input)
        {
            var userId = AbpSession.UserId.Value;
            if(userId != input.UserId)
            {
                throw new UserFriendlyException(string
                    .Format("You can't edit other people's comments"));
            }

            var item = await WorkLimit.GetAsync<Comment>(input.Id);
            ObjectMapper.Map<CommentCreateEditDto, Comment>(input, item);

            await WorkLimit.UpdateAsync(item);

            return input;
        }

        [HttpDelete]
        public async System.Threading.Tasks.Task Delete(EntityDto<long> input)
        {
            var comment = await GetCommentById(input.Id);
            var userId = AbpSession.UserId.Value;

            if (userId != comment.UserId)
            {
                throw new UserFriendlyException(string
                    .Format("You can't delete other people's comments"));
            }

            await WorkLimit.GetRepo<Comment>().DeleteAsync(input.Id);
        }

        [HttpPost]
        public async Task<GetCommentByIdDto> GetCommentById(long commentId)
        {
            var comment = await WorkLimit.GetAll<Comment>()
                .Where(s => s.Id == commentId)
                .Select(s => new GetCommentByIdDto
                {
                    Id = s.Id,
                    Description = s.Description,
                    ImagePath = s.ImagePath,
                    UserId = s.UserId,
                    EmailAddress = s.User.EmailAddress,
                    FullName = s.User.FullName,
                    UserName = s.User.UserName,
                    TaskId = s.TaskId
                })
                .FirstOrDefaultAsync();

            return comment;
        }

        [HttpPost]
        public async Task<List<GetAllCommentByTaskIdDto>> GetAllCommentByTaskId(long taskId)
        {
            return await WorkLimit.GetAll<Comment>()
                .Where(s => s.TaskId == taskId)
                .Select(s => new GetAllCommentByTaskIdDto
                {
                    Description = s.Description,
                    EmailAddress = s.User.EmailAddress,
                    FullName = s.User.FullName,
                    //ImagePath = s.ImagePath,
                    UserId = s.UserId,
                    UserName = s.User.UserName,
                }).ToListAsync();
        }

        [HttpPost]
        public async Task<string> UploadImageComment(IFormFile file)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                PublicId = "my_folder/" + file.FileName
            };

            var t =await _cloudinary.UploadAsync(uploadParams);
            return Path.GetFileName(new Uri(t.Url.ToString()).AbsolutePath);

        }
    }
}