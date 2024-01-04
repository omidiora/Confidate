using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyMessages.Commands
{
    public class AddEmergencyMessage : IRequest<Result>
    {
        public string Message { get; set; }
    }

    public class AddEmergencyMessageValidator
     : AbstractValidator<AddEmergencyMessage>
    {
        public AddEmergencyMessageValidator()
        {
            RuleFor(v => v.Message)
               .NotEmpty();
        }
    }

    public class AddEmergencyMessageHandler
     : IRequestHandler<AddEmergencyMessage, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddEmergencyMessageHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(AddEmergencyMessage request,
            CancellationToken cancellationToken)
        {
            _context.EmergencyMessages.Add(new EmergencyMessage()
            {
                UserEmail = _currentUserService.UserId,
                Message = request.Message,
                IsActive = false
            });

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
