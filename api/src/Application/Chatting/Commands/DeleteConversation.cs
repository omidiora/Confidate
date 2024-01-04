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
    public class DeleteConversation : IRequest<Result>
    {
        public int ConversationId { get; set; }
    }

    public class DeleteConversationValidator
        : AbstractValidator<DeleteConversation>
    {
        public DeleteConversationValidator()
        {
            RuleFor(v => v.ConversationId)
               .NotEmpty();
        }
    }

    public class DeleteConversationHandler
        : IRequestHandler<DeleteConversation, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DeleteConversationHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            DeleteConversation request, CancellationToken cancellationToken)
        {
            var conv = await (from con in _context.Conversations
                              join par in _context.ConversationParties
                                on con.Id equals par.ConversationId
                              where par.UserEmail == _currentUserService.UserId
                                    & con.Id == request.ConversationId
                              select con
                         ).FirstOrDefaultAsync(cancellationToken);

            _context.Conversations.Remove(conv);
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
