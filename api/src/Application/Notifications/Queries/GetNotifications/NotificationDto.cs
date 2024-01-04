using Confidate.Application.Common.Mappings;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.Notifications.Queries.GetNotifications
{
  public class NotificationDto : IMapFrom<Notification>
  {
    public int Id { get; set; }
    public string UserEmail { get; set; }
    public string NotificationType { get; set; }

    public string Description { get; set; }
    public int ReferenceId { get; set; }
    public bool IsRead { get; set; }
  }
}
