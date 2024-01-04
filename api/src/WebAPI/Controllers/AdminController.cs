using Confidate.Application.Common.Models;
using Confidate.Application.PsyTests;
using Confidate.Application.Users.Commands;
using Confidate.Application.Users.Commands.CreateUser;
using Confidate.Application.Users.Queries;
using Confidate.Application.Users.Queries.GetUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Confidate.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class AdminController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Result>> AddPsyTest(AddPsyTest command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult<Result>> UpdatePsyTest(UpdatePsyTest command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult<Result>> DeletePsyTest(DeletePsyTest command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<PaginatedList<UserDto>> GetUsersList(GetUsersQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<PaginatedList<UserDatesDto>> GetDateHistory(
            GetDateHistoryForAdmin query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<Result> BlockUser(BlockUser command)
        {
            return await Mediator.Send(command);
        }
    }
}
