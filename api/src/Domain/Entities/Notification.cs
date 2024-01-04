using Confidate.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
  public class Notification : AuditableEntity
  {
    public int Id { get; set; }
    public string UserEmail { get; set; }
    public string NotificationType { get; set; }

    public string Description { get; set; }
    public int ReferenceId { get; set; }
    public bool IsRead { get; set; }
  }
}
