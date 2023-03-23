using Abp.Auditing;
using Abp.Authorization;
using Microsoft.AspNetCore.Mvc;
using Proman.APIs.AuditLogs.Dto;
using Proman.Authorization.Users;
using Proman.Extension;
using Proman.IIoc;
using Proman.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.APIs.AuditLogs
{
    public class AuditLogAppService : PromanAppServiceBase

    {
        public AuditLogAppService(IWorkLimit workLimit) : base(workLimit)
        { }
        [HttpPost]
        public async Task<GridResult<GetAuditLogDto>> GetAllPagging(GridParam input)
        {
            var dEmailAddress = WorkLimit.GetAll<User>().ToDictionary(s => s.Id, s => s.EmailAddress);
            var query = WorkLimit.GetAll<AuditLog>()
                .Select(s => new GetAuditLogDto
                {
                    ExecutionDuration = s.ExecutionDuration,
                    ExecutionTime = s.ExecutionTime,
                    MethodName = s.MethodName,
                    Parameters = s.Parameters,
                    ServiceName = s.ServiceName,
                    UserId = s.UserId,
                    UserIdString = s.UserId.ToString(),
                    EmailAddress = s.UserId.HasValue ? dEmailAddress.ContainsKey(s.UserId.Value) ? dEmailAddress[s.UserId.Value] : "" : ""
                });

            return await query.GetGridResult(query, input);
        }
    }
}
