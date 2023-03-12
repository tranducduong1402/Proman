using Abp.AutoMapper;
using Abp.Domain.Entities;
using Proman.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.Positions.Dto
{
    [AutoMapTo(typeof(Position))]
    public class PositionCreateEditDto : Entity<long>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ShortName { get; set; }

        public string Color { get; set; }

        public string Code { get; set; }
    }
}
