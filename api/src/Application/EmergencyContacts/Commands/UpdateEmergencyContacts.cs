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
    public class UpdateEmergencyContacts : IRequest<Result>
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
    }

    public class UpdateEmergencyContactsValidator
     : AbstractValidator<UpdateEmergencyContacts>
    {
        public UpdateEmergencyContactsValidator()
        {
            RuleFor(v => v.PhoneNumber)
               .NotEmpty();

            RuleFor(v => v.Id)
               .NotEmpty();
        }
    }

    public class UpdateEmergencyContactsHandler
     : IRequestHandler<UpdateEmergencyContacts, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UpdateEmergencyContactsHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(UpdateEmergencyContacts request,
            CancellationToken cancellationToken)
        {
            var contacts = await _context.EmergencyContacts
                            .Where(a => a.UserEmail == _currentUserService.UserId)
                            .ToListAsync(cancellationToken);

            var contact = contacts
                            .Where(a => a.UserEmail == _currentUserService.UserId
                            && a.Id == request.Id)
                           .FirstOrDefault();

            if (contact == null) return Result.Failure(new string[] { "NOT_FOUND" });

            if (contacts.Where(a => a.PhoneNumber == request.PhoneNumber).Count() > 0)
            {
                if (contact.Id != request.Id)
                    return Result.Failure(new string[] { "CONTACT_EXISTS_ALREADY" });
            }

            contact.PhoneNumber = request.PhoneNumber;
            contact.ContactType = request.Name;

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
