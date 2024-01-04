using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.Common.Interfaces
{
  public interface IPasswordHasher
  {
    byte[] Hash(string password, byte[] salt);
  }
}
