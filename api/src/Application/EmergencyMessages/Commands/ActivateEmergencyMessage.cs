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
    public class ActivateEmergencyMessage : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class ActivateEmergencyMessageValidator
   : AbstractValidator<ActivateEmergencyMessage>
    {
        public ActivateEmergencyMessageValidator()
        {
            RuleFor(v => v.Id)
               .NotEmpty();
        }
    }

    public class ActivateEmergencyMessageHandler
     : IRequestHandler<ActivateEmergencyMessage, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public ActivateEmergencyMessageHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(ActivateEmergencyMessage request,
            CancellationToken cancellationToken)
        {
            var messages = await _context.EmergencyMessages
                                .Where(a => a.UserEmail == _currentUserService.UserId)
                                .ToListAsync(cancellationToken);

            var selectedMessage = messages.Where(a => a.Id == request.Id).FirstOrDefault();
            if(selectedMessage == null) return Result.Failure(new string[] { "MESSAGE_NOT_FOUND" });

            messages.ForEach(a => a.IsActive = false);
            selectedMessage.IsActive = messages.Count() == 1 ? !selectedMessage.IsActive : true;

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
