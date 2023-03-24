using Abp.Domain.Entities;
using Proman.Anotations;

namespace Proman.APIs.Positions.Dto
{
    public class PositionDto : Entity<long>
    {
        [ApplySearch]
        public string Name { get; set; }
        [ApplySearch]
        public string ShortName { get; set; }
        public string Color { get; set; }
        [ApplySearch]
        public string Code { get; set; }
    }
}
