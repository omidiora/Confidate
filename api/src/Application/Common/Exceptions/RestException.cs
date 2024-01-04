using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.Common.Exceptions
{
  public class RestException : Exception
  {
    public RestException(HttpStatusCode code, string error = "something went wrong")
    {
      Code = code;
      Error = error;
    }

    public string Error { get; set; }

    public HttpStatusCode Code { get; }
  }
}
