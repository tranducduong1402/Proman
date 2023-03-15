using Abp.Domain.Entities;
using Proman.Anotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.ReviewUsers.Dto
{
    public class ReviewUserDto : Entity<long>
    {
        [ApplySearch]
        public string Name { get; set; }
        public ReviewUserStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Deadline { get; set; }
    }
}
