using System.Threading.Tasks;
using Proman.Configuration.Dto;

namespace Proman.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
