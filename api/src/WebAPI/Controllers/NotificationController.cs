using Confidate.Application.Common.Models;
using Confidate.Application.Notifications.Commands;
using Confidate.Application.Notifications.Queries.GetNotifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Confidate.WebAPI.Controllers
{
  [Route("api/[controller]/[action]")]
  [Authorize]
  public class NotificationController : ApiControllerBase
  {
    //[HttpPost]
    //public async Task<PaginatedList<NotificationDto>> Get(GetNotificationsQuery query)
    //{
    //  return await Mediator.Send(query);
    //}

    //[HttpPost]
    //public async Task<ActionResult<Result>> MarkAsRead(MarkNotificationCommand command)
    //{
    //  return await Mediator.Send(command);
    //}
  }
}
