using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Paging
{
    public class PagingResult<T>
    {
        public long TotalItems { get; set; }
        public List<T> Items { get; set; }
    }
}
