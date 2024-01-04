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
    public class SosCommand : IRequest<Result>
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

    public class SosCommandHandler
    : IRequestHandler<SosCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly ISmsService _smsService;

        public SosCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService,
            ISmsService smsService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
            _smsService = smsService;
        }

        public async Task<Result> Handle(SosCommand request,
            CancellationToken cancellationToken)
        {
            var contacts = await _context.EmergencyContacts
            .Where(a => a.UserEmail == _currentUserService.UserId)
            .Select(a => a.PhoneNumber)
            .ToArrayAsync(cancellationToken);

            if (contacts == null) return Result.Failure(new string[] { "CONTACTS_NOT_FOUND" });

            var mapsLink = $"http://www.google.com/maps/place/{request.Latitude},{request.Longitude}";

            var message = await _context.EmergencyMessages
                        .Where(a => a.UserEmail == _currentUserService.UserId 
                        && a.IsActive == true)
                        .Select(a => a.Message)
                        .FirstOrDefaultAsync(cancellationToken);

            if (message == null) message = $"Please Help! - {mapsLink}";

            // send sms to contacts 
            await _smsService.Send(new SmsDto()
            {
                Message = message + $" - {mapsLink}",
                To = contacts
            });

            return Result.Success();
        }
    }
}
