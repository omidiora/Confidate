using Confidate.Application.Common.Models;
using Confidate.Application.PsyTests;
using Confidate.Application.Users.Commands;
using Confidate.Application.Users.Commands.CreateUser;
using Confidate.Application.Users.Queries;
using Confidate.Application.Users.Queries.GetUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confidate.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : ApiControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserDto>> Get()
        {
            var cmd = new GetUserQuery();
            return await Mediator.Send(cmd);
        }

        [HttpPost]
        public async Task<ActionResult<Result>> Add(CreateUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Result>> Update(UpdateProfileCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Result>> UpdateProfilePic(
            UpdateProfilePicCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Result>> UpdateLocation(UpdateUserLocationPoint command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PaginatedList<UserPointDto>>> GetLocationHistory(
            GetUserLocationHistory command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<Result> UpdateVerificationData(
            UpdateVerificationData command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<Result> UpdateTrackingConsent(UpdateTrackingConsent command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Authorize]
        public async Task<Result> AddDateEntry(
            AddUserDates command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PaginatedList<UserDatesDto>>> GetUserDateHistory(
            GetUserDateHistory command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<PaginatedList<PsyTestDto>> GetPsyTests(GetPsyTests req)
        {
            return await Mediator.Send(req);
        }

        [HttpPost]
        public async Task<GetUsersDashboardResponse> GetUsersDashboard(GetUsersDashboard query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<Result> DeleteMe(DeleteUser cmd)
        {
            return await Mediator.Send(cmd);
        }

        [HttpGet]
        public async Task<List<string>> MyGallery()
        {
            var query = new GetUserGallery();
            return await Mediator.Send(query);
        }
    }
}
