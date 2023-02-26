using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Proman.Authorization;

namespace Proman
{
    [DependsOn(
        typeof(PromanCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class PromanApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<PromanAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(PromanApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
