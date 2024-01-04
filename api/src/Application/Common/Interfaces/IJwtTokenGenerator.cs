using Confidate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.Common.Interfaces
{
  public interface IJwtTokenGenerator
  {
    Task<string> CreateToken(string sub, string[] roles);
  }
}
