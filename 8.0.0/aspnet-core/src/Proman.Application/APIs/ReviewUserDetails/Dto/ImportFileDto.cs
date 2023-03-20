using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.ReviewUserDetails.Dto
{
    public class ImportFileDto
    {
        public IFormFile File { get; set; }
        public long ReviewUserId { get; set; }
        public long ProjectId { get; set; }
    }
}
