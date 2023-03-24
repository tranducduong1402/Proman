using Abp.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.ReviewUserDetails.Dto
{
    public class UpdateReviewUserDetailDto
    {
        public long Row { get; set; }
        public string Email { get; set; }
        public string PositionName { get; set; }
        public string Point { get; set; }
        public float? PointF
        {
            get
            {
                if (string.IsNullOrEmpty(Point))
                    return null;
                try
                {
                    //return Convert.ToInt64(Point);
                    return float.Parse(Point);
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
        public string Note { get; set; }
        public bool IsEmpty => Email.IsNullOrEmpty() && PositionName.IsNullOrEmpty() && Point.IsNullOrEmpty() && Note.IsNullOrEmpty();
    }
}
