using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace Confidate.Application.Chatting.Commands
{
    public class CreateConversation : IRequest<Result>
    {
        public string ToPhoneNumber { get; set; }
    }

    public class CreateConversationValidator
        : AbstractValidator<CreateConversation>
    {
        public CreateConversationValidator()
        {
            RuleFor(v => v.ToPhoneNumber)
               .NotEmpty();
        }
    }

    public class CreateConversationHandler
        : IRequestHandler<CreateConversation, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public CreateConversationHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            CreateConversation request, CancellationToken cancellationToken)
        {
            var conv = await (from cov in _context.Conversations
                       join par in _context.ConversationParties
                            on cov.Id equals par.ConversationId
                       join par2 in _context.ConversationParties
                            on cov.Id equals par2.ConversationId
                       where
                            par.PhoneNumber == request.ToPhoneNumber
                            && par2.UserEmail == _currentUserService.UserId
                       select cov).FirstOrDefaultAsync(cancellationToken)
                            ;
            if (conv != null) return Result.Success(new { id = conv.Id });

            var fromUser = await _context.Users
                            .Where(a => a.Email == _currentUserService.UserId)
                            .FirstOrDefaultAsync(cancellationToken);

            var toUser = await _context.Users
                            .Where(a => a.PhoneNumber == request.ToPhoneNumber)
                            .FirstOrDefaultAsync(cancellationToken);

            if(fromUser == null || toUser == null)
            {
                return Result.Failure(new string[] { "CANNOT_FIND_USER" });
            }

            var newConversation = new Conversation();
            newConversation.Parties.Add(new ConversationParty()
            {
                PhoneNumber = fromUser.PhoneNumber,
                UserEmail = fromUser.Email,
            });
            newConversation.Parties.Add(new ConversationParty()
            {
                PhoneNumber = toUser.PhoneNumber,
                UserEmail = toUser.Email,
            });

            _context.Conversations.Add(newConversation);
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success(new { id = newConversation.Id });
        }
    }
}
