using Confidate.Application.Common.Interfaces;
using System;

namespace Confidate.Infrastructure.Services
{
  public class DateTimeService : IDateTime
  {
    public DateTime Now => DateTime.Now;
  }
}
