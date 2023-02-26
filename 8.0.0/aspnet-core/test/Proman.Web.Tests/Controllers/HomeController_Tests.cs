using System.Threading.Tasks;
using Proman.Models.TokenAuth;
using Proman.Web.Controllers;
using Shouldly;
using Xunit;

namespace Proman.Web.Tests.Controllers
{
    public class HomeController_Tests: PromanWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}