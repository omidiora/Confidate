using Confidate.Application.Common.Models;
using Confidate.Application.EmergencyContacts.Commands;
using Confidate.Application.EmergencyContacts.Queries;
using Confidate.Application.EmergencyMessages.Commands;
using Confidate.Application.EmergencyMessages.Queries;
using Confidate.Application.EmergencyPhrases.Commands;
using Confidate.Application.EmergencyPhrases.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Confidate.WebAPI.Controllers
{
    [Authorize]
    public class EmergencyController : ApiControllerBase
    {
        [HttpPost]
        [Route("sos")]
        public async Task<Result> Sos(SosCommand command)
        {
            return await Mediator.Send(command);
        }

        /// <summary>
        /// messages
        /// </summary>

        [HttpPost]
        [Route("messages/[action]")]
        public async Task<ActionResult<PaginatedList<EmergencyMessageDto>>> Get(
            GetEmergencyMessages command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("messages/[action]")]
        public async Task<ActionResult<Result>> Add(
            AddEmergencyMessage command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("messages/[action]")]
        public async Task<ActionResult<Result>> Activate(
            ActivateEmergencyMessage command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("messages/[action]")]
        public async Task<ActionResult<Result>> Delete(
            DeleteMessage command)
        {
            return await Mediator.Send(command);
        }

        /// <summary>
        /// Phrases
        /// </summary>
        [HttpPost]
        [Route("phrases/[action]")]
        public async Task<ActionResult<PaginatedList<EmergencyPhrasesDto>>> Get(
            GetEmergencyPhrases command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("phrases/[action]")]
        public async Task<ActionResult<Result>> Add(
            AddEmergencyPhrases command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("phrases/[action]")]
        public async Task<ActionResult<Result>> Activate(
            ActivateEmergencyPhrases command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("phrases/[action]")]
        public async Task<ActionResult<Result>> Delete(
            DeleteEmergencyPhrases command)
        {
            return await Mediator.Send(command);
        }

        /// <summary>
        /// Contacts
        /// </summary>
        [HttpPost]
        [Route("contacts/[action]")]
        public async Task<ActionResult<PaginatedList<EmergencyContactsDto>>> Get(
            GetEmergencyContacts command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("contacts/[action]")]
        public async Task<ActionResult<Result>> Upsert(
            AddEmergencyContacts command)
        {
            // DEPRECATED
            return await Mediator.Send(command);
        }


        [HttpPost]
        [Route("contacts/[action]")]
        public async Task<ActionResult<Result>> Add(
            AddEmergencyContacts command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("contacts/[action]")]
        public async Task<ActionResult<Result>> Update(
            UpdateEmergencyContacts command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("contacts/[action]")]
        public async Task<ActionResult<Result>> Delete(
            DeleteEmergencyContacts command)
        {
            return await Mediator.Send(command);
        }
    }
}
