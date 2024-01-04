using Confidate.Domain.Common;
using System.Threading.Tasks;

namespace Confidate.Application.Common.Interfaces
{
  public interface IDomainEventService
  {
    Task Publish(DomainEvent domainEvent);
  }
}
