using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Users.Dto
{
    public class UserManagerDto
    {
        public long ManagerId { get; set; }
        public string AvatarPath { get; set; }
        public string ManagerName { get; set; }
    }
}
