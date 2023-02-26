using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Microsoft.Extensions.Configuration;
using Proman.Configuration.Dto;
using Proman.IIoc;

namespace Proman.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : PromanAppServiceBase, IConfigurationAppService
    {
        private readonly IConfiguration _configuration;
        public ConfigurationAppService(IConfiguration configuration, IWorkLimit workLimit) : base(workLimit)
        {
            _configuration = configuration;
        }
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
