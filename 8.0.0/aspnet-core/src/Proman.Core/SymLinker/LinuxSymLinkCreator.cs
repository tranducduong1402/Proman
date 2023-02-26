using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.SymLinker
{
    public class LinuxSymLinkCreator : ISymLinkCreator
    {
        public bool CreateSymLink(string linkPath, string targetPath, bool file)
        {
            throw new NotImplementedException();
        }
    }
}
