using Confidate.Domain.Common;
using Confidate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
  public class UserRole : AuditableEntity
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public Role Role { get; set; }
  }
}
