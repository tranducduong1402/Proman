using Microsoft.AspNetCore.Http;
using Proman.Uitls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Users.Dto
{
    public class AvatarDto
    {
        public IFormFile File { get; set; }
        public long UserId { get; set; }
    }

    public class GetAvatarPathDto
    {
        public string AvatarPath { get; set; }
        public string AvatarFullPath => FileUtils.FullFilePath(AvatarPath);
    }
}
