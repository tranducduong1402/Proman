using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Users.Dto
{
    public class GetAllPMDto
    {
        public long PMId { get; set; }
        public string PMFullName { get; set; }
        public string PMEmailAddress { get; set; }
        public string PMAvatarPath { get; set; }

    }
}
