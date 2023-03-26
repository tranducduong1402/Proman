using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.UploadFileService.Dto
{
    public class InputFileDto
    {
        public IFormFile File { get; set; }
    }
}
