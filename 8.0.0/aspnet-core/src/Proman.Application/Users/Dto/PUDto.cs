using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.Users.Dto
{
    public class PUDto
    {
        public long? ProjectId { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public ProjectUserType ProjectUserType { get; set; }
        public List<string> Pms { get; set; }
    }
}
