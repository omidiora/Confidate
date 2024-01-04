using Confidate.Application.Chatting.Commands;
using Confidate.Application.Chatting.Queries;
using Confidate.Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confidate.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class ChatController : ApiControllerBase
    {
        [HttpPost]
        public async Task<List<FindFriendsResponse>> FindFriends(FindFriends query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<PaginatedList<ChatDto>> GetChat(GetChat query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<PaginatedList<ConversationDto>> GetMyConversations(
            GetMyConversations query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<Result> SaveChat(
            SaveChat query)
        {
            return await Mediator.Send(query);
        }


        [HttpPost]
        public async Task<Result> DeleteMessage(
            DeleteMessage query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<Result> CreateConversation(
            CreateConversation query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<Result> DeleteConversation(DeleteConversation command)
        {
            return await Mediator.Send(command);
        }
    }
}
