using Proman.Anotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.AuditLogs.Dto
{
    public class GetAuditLogDto
    {
        public long? UserId { get; set; }
        [ApplySearch]
        public string EmailAddress { get; set; }
        [ApplySearch]
        public string MethodName { get; set; }
        public string Parameters { get; set; }
        public DateTime ExecutionTime { get; set; }
        public int ExecutionDuration { get; set; }
        [ApplySearch]
        public string ServiceName { get; set; }
        [ApplySearch]
        public string UserIdString { get; set; }
    }
}
