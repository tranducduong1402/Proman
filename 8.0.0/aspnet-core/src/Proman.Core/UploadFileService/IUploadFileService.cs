using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.UploadFileService
{
    public interface IUploadFileService
    {
        Task<string> UploadAvatarAsync(IFormFile file, string tenantName);

        Task<string> UploadFileAsync(IFormFile file, string[] allowFileTypes, string filePath);
    }
}
