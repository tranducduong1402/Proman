﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Constants
{
    public class ConstantUploadFile
    {
        public static string Provider { get; set; }

        public static string[] AllowImageFileTypes { get; set; }


        public static readonly string AMAZONE_S3 = "AWS";
        public static readonly string INTERNAL = "Internal";

        public static string AvatarFolder { get; set; }
        public const string APP_NAME = "proman";
    }
}
