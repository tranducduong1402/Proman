﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Extension
{
    public static class GuidEx
    {
        /// <summary>
		/// Determines whether the specified Guid "value" is actually a valid guid.
		/// In invalid Guid is either null or Guid.Empty
		/// </summary>
		public static bool IsGuid(this Guid? value)
        {
            return value != null && !value.Equals(Guid.Empty);
        }
    }
}
