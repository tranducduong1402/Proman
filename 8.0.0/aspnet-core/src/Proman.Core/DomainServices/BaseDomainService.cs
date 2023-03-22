using Abp.Dependency;
using Abp.Domain.Services;
using Proman.IIoc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.DomainServices
{
    public class BaseDomainService : DomainService
    {
        public IWorkLimit WorkLimit { get; set; }
        public BaseDomainService()
        {
            this.WorkLimit = IocManager.Instance.Resolve<IWorkLimit>();
        }
        public BaseDomainService(IWorkLimit workLimit)
        {
            this.WorkLimit = workLimit;
        }
    }
}
