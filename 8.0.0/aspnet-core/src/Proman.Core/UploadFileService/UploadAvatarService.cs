﻿using Abp.Dependency;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Proman.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.UploadFileService
{
    public class UploadAvatarService : ITransientDependency
    {
        private readonly IUploadFileService _uploadFileService;
        private readonly ILogger<UploadAvatarService> _logger;
        private readonly TenantManager _tenantManager;
        private readonly IAbpSession _session;
        public UploadAvatarService(IUploadFileService fileService, ILogger<UploadAvatarService> logger, TenantManager tenantManager, IAbpSession session)
        {
            _uploadFileService = fileService;
            _logger = logger;
            _tenantManager = tenantManager;
            _session = session;
        }

        public Task<string> UploadAvatarAsync(IFormFile file)
        {
            var tenantName = GetTenantName();
            return _uploadFileService.UploadAvatarAsync(file, tenantName);
        }

        private string GetTenantName()
        {
            if (_session.TenantId.HasValue)
            {
                var tenant = _tenantManager.GetById(_session.TenantId.Value);
                return tenant.TenancyName;
            }
            return "host";
        }
    }
}
