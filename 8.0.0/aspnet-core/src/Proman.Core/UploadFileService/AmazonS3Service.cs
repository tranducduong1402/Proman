﻿using Abp.UI;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Proman.Constants;
using Proman.Uitls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.UploadFileService
{
    public class AmazonS3Service : IUploadFileService
    {
        private readonly ILogger<AmazonS3Service> logger;
        private readonly IAmazonS3 s3Client;

        public AmazonS3Service(ILogger<AmazonS3Service> logger, IAmazonS3 _s3Client)
        {
            this.logger = logger;
            this.s3Client = _s3Client;
        }

        public async Task<string> UploadFileAsync(IFormFile file, string[] allowFileTypes, string filePath)
        {
            var strAlowFileType = string.Join(", ", allowFileTypes);
            logger.LogInformation($"UploadFile() fileName: {file.FileName}, contentType: {file.ContentType}, allowFileTypes: {strAlowFileType}, filePath: {filePath}");
            CheckValidFile(file, allowFileTypes);

            var key = $"{ConstantAmazonS3.Prefix?.TrimEnd('/')}/{filePath}";

            logger.LogInformation($"UploadImageFile() Key: {key}");
            var request = new PutObjectRequest()
            {
                BucketName = ConstantAmazonS3.BucketName,
                Key = key,
                InputStream = file.OpenReadStream()
            };
            request.Metadata.Add("Content-Type", file.ContentType);
            var response = await s3Client.PutObjectAsync(request);
            logger.LogDebug(JsonConvert.SerializeObject(response));
            return key;
        }

        private void CheckValidFile(IFormFile file, string[] allowFileTypes)
        {
            var fileExt = FileUtils.GetFileExtension(file);
            if (!allowFileTypes.Contains(fileExt))
                throw new UserFriendlyException($"Wrong file type {file.ContentType}. Allow file types: {string.Join(", ", allowFileTypes)}");
        }

        public async Task<string> UploadAvatarAsync(IFormFile file, string tenantName)
        {
            var filePath = $"{ConstantUploadFile.AvatarFolder?.TrimEnd('/')}/{tenantName}/{DateTimeUtils.NowToYYYYMMddHHmmss()}_{Guid.NewGuid()}.{FileUtils.GetFileExtension(file)}";
            return await UploadFileAsync(file, ConstantUploadFile.AllowImageFileTypes, filePath);
        }
    }
}
