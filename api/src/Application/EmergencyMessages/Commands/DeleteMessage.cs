using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyMessages.Commands
{
    public class DeleteMessage : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class DeleteMessageValidator
  : AbstractValidator<DeleteMessage>
    {
        public DeleteMessageValidator()
        {
            RuleFor(v => v.Id)
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

        public async Task<Result> Handle(DeleteMessage request,
            CancellationToken cancellationToken)
        {
            var selectedMessage = await _context.EmergencyMessages
                                .Where(a => a.UserEmail == _currentUserService.UserId && a.Id == request.Id)
                                .FirstOrDefaultAsync(cancellationToken);

            if (selectedMessage == null) return Result.Failure(new string[] { "MESSAGE_NOT_FOUND" });

            _context.EmergencyMessages.Remove(selectedMessage);

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
