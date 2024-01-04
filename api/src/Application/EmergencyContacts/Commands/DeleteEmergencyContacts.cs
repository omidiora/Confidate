using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyContacts.Commands
{
    public class DeleteEmergencyContacts : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class DeleteEmergencyContactsValidator
  : AbstractValidator<DeleteEmergencyContacts>
    {
        public DeleteEmergencyContactsValidator()
        {
            RuleFor(v => v.Id)
               .NotEmpty();
        }
    }

    public class DeleteEmergencyContactsHandler
    : IRequestHandler<DeleteEmergencyContacts, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DeleteEmergencyContactsHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(DeleteEmergencyContacts request,
            CancellationToken cancellationToken)
        {
            var selected = await _context.EmergencyContacts
            .Where(a => a.UserEmail == _currentUserService.UserId && a.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

            if (selected == null) return Result.Failure(new string[] { "CONTACT_NOT_FOUND" });

            _context.EmergencyContacts.Remove(selected);

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
