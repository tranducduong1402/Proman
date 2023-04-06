using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Comments.Dto
{
    public class GetAllCommentByTaskIdDto
    {
        public string Description { get; set; }
        //public string ImagePath { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string EmailAddress { get; set; }
    }
}
