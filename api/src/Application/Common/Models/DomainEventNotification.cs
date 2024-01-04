using Confidate.Domain.Common;
using MediatR;

namespace Confidate.Application.Common.Models
{
  public class DomainEventNotification<TDomainEvent> : INotification where TDomainEvent : DomainEvent
  {
    public DomainEventNotification(TDomainEvent domainEvent)
    {
      DomainEvent = domainEvent;
    }

    public TDomainEvent DomainEvent { get; }
  }
}
