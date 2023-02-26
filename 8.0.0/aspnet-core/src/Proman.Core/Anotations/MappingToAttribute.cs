﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Anotations
{
    [AttributeUsage(AttributeTargets.Property)]
    public class MappingToAttribute : Attribute
    {
        public Type MapTo { get; set; }
    }
}
