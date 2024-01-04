using Confidate.Domain.Common;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Events
{
  public class UserAdded : DomainEvent
  {
    public UserAdded(User data)
    {
      User = data;
    }

    public User User { get; }
  }
}
