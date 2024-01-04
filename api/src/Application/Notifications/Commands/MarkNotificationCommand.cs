using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Notifications.Commands
{
    public class MarkNotificationCommand : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class MarkNotificationCommandValidator : AbstractValidator<MarkNotificationCommand>
    {
        public MarkNotificationCommandValidator()
        {
            RuleFor(v => v.Id)
                .GreaterThan(0)
                .NotEmpty();
        }
    }

    public class MarkNotificationCommandHandler : IRequestHandler<MarkNotificationCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        public MarkNotificationCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result> Handle(MarkNotificationCommand request,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            var entity = new Notification { Id = request.Id, IsRead = true };
            //_context.Notifications.Attach(entity).Property(x => x.IsRead).IsModified = true;
            //await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
