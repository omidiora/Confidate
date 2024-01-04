using Confidate.Domain.Enums;

namespace Confidate.Application.Common.Interfaces
{
  public interface ICurrentUserService
  {
    string UserId { get; }
    Role[] Roles { get; }
    bool IsAdmin { get; }
  }
}
