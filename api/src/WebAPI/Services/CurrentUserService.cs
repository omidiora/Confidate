using Confidate.Application.Common.Interfaces;
using Confidate.Domain.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace Confidate.WebAPI.Services
{
  public class CurrentUserService : ICurrentUserService
  {
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
      if (httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role) != null)
      {
        Roles = httpContextAccessor.HttpContext.User
            .FindFirstValue(ClaimTypes.Role).Split(":")
            .Select(r => (Role)Enum.Parse(typeof(Role), r)).ToArray();
      }
    }

    public string UserId => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public Role[] Roles { get; }

    public bool IsAdmin => Roles != null && Roles.Contains(Role.Admin);
  }
}
