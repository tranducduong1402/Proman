using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Proman.Controllers
{
    public abstract class PromanControllerBase: AbpController
    {
        protected PromanControllerBase()
        {
            LocalizationSourceName = PromanConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
