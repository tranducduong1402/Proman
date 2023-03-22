using Abp.Application.Services.Dto;
using OfficeOpenXml.Drawing.Chart.ChartEx;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.Projects.Dto
{
    public class GetUserByProjectIdDto : EntityDto<long>
    {
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string EmailAddress { get; set; }
        public ProjectUserType Type { get; set; }
    }
}
