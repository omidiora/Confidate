using Confidate.Application.Common.Models;
using Confidate.Application.Users.Commands;
using Confidate.Application.Users.Commands.Login;
using Confidate.Application.Users.Commands.ValidateOtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Confidate.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Result>> Login(LoginCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult<ValidateOtp>> ValidateOtp(
            ValidateOtpCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult<Result>> RequestOtp(
            RequestOtpCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Result>> ChangePassword(
            ChangePasswordCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Result>> ResetPassword(
            ResetPassword command)
        {
            var com = new ChangePasswordCommand()
            {
                Password = command.Password
            };
            return await Mediator.Send(com);
        }
    }

    public class ResetPassword
    {
        public string Password { get; set; }
    }
}
