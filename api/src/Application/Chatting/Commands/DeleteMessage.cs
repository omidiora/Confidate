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
    public class DeleteMessage : IRequest<Result>
    {
        public int MessageId { get; set; }
    }

    public class DeleteMessageValidator
        : AbstractValidator<DeleteMessage>
    {
        public DeleteMessageValidator()
        {
            RuleFor(v => v.MessageId)
               .NotEmpty();
        }
    }

    public class DeleteMessageHandler
        : IRequestHandler<DeleteMessage, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DeleteMessageHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            DeleteMessage request, CancellationToken cancellationToken)
        {
            var conv = await _context.Chats.Where(a => a.Id == request.MessageId 
            && a.CreatedBy == _currentUserService.UserId)
                .FirstOrDefaultAsync(cancellationToken);

            if (conv == null)
            {
                return Result.Failure(new string[] { "MESSAGE_NOT_FOUND" });
            }

            conv.IsDeleted = true;
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
