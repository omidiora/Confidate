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
    public class SaveChat : IRequest<Result>
    {
        public int ConversationId { get; set; }
        public string Message { get; set; }
        public string[] Photos { get; set; }
        public string[] Videos { get; set; }
    }

    public class SaveChatValidator
   : AbstractValidator<SaveChat>
    {
        public SaveChatValidator()
        {
            RuleFor(v => v.ConversationId)
                .GreaterThan(0);
        }
    }

    public class SaveChatHandler
     : IRequestHandler<SaveChat, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public SaveChatHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            SaveChat request, CancellationToken cancellationToken)
        {
            var conversation = await _context.Conversations
                               .Include(a => a.Parties)
                               .Where(a => a.Id == request.ConversationId)
                               .FirstOrDefaultAsync(cancellationToken);

            if (conversation == null)
            {
                return Result.Failure(new string[] { "CONVERSATION_NOT_FOUND" });
            }

            var from = conversation.Parties
                .Find(a => a.UserEmail == _currentUserService.UserId);

            if (from == null) return Result.Failure(new string[] { "CONVERSATION_NOT_FOUND" });

            var chat = new Chat()
            {
                ConversationId = conversation.Id,
                Message = request.Message,
                Photos = request.Photos,
                Videos = request.Videos,
                From = from,
                IsRead = false,
            };

            conversation.Chats.Add(chat);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
