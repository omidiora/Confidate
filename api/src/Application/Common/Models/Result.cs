using System.Collections.Generic;
using System.Linq;

namespace Confidate.Application.Common.Models
{
  public class Result
  {
    internal Result(bool succeeded, IEnumerable<string> errors)
    {
      Succeeded = succeeded;
      Errors = errors.ToArray();
    }

    internal Result(bool succeeded, IEnumerable<string> errors, dynamic data)
    {
      Succeeded = succeeded;
      Data = data;
      Errors = errors.ToArray();
    }

    public bool Succeeded { get; set; }
    public dynamic Data { get; set; }

    public string[] Errors { get; set; }

    public static Result Success()
    {
      return new Result(true, new string[] { });
    }

    public static Result Success(dynamic data)
    {
      return new Result(true, new string[] { }, data);
    }

    public static Result Failure(IEnumerable<string> errors)
    {
      return new Result(false, errors);
    }
  }
}
