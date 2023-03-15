using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Proman.Constants.Enum.StatusEnum;

namespace Proman.APIs.ReviewUsers.Dto
{
    [AutoMapTo(typeof(ReviewUser))]
    public class ReviewUserCreateEditDto : Entity<long>
    {
        [Required]
        public string Name { get; set; }
        public ReviewUserStatus Status { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        
        public DateTime Deadline { get; set; }
    }
}
