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
    public class AddEmergencyContacts : IRequest<Result>
    {
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
    }

    public class UpsertEmergencyContactsValidator
     : AbstractValidator<AddEmergencyContacts>
    {
        public UpsertEmergencyContactsValidator()
        {
            RuleFor(v => v.PhoneNumber)
               .NotEmpty();            
        }
    }

    public class AddEmergencyContactsHandler
     : IRequestHandler<AddEmergencyContacts, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddEmergencyContactsHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(AddEmergencyContacts request,
            CancellationToken cancellationToken)
        {
            var contacts = await _context.EmergencyContacts
                            .Where(a => a.UserEmail == _currentUserService.UserId)
                            .ToListAsync(cancellationToken);

            if (contacts.Count() >= 4) return Result.Failure(new string[] { "MAX_LIMIT_REACHED" });

            if(contacts.Where(a => a.PhoneNumber == request.PhoneNumber).Count() > 0)
            {
                return Result.Failure(new string[] { "CONTACT_EXISTS_ALREADY" });
            }

            _context.EmergencyContacts.Add(new EmergencyContact()
            {
                UserEmail = _currentUserService.UserId,
                ContactType = request.Name,
                PhoneNumber = request.PhoneNumber
            });
            
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
