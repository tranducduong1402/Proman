using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Proman.Helper
{
    public class FileUploadInfo
    {
        public string FileName { get; set; }
        [JsonIgnore]
        public string FilePath { get; set; }
        public string MineType { get; set; }
        public long FileSize { get; set; }
        public string ServerPath { get; set; }
    }

    public enum ResourceType : byte
    {
        Video = 0,
        Document = 1,
        Image = 2
    }
}
