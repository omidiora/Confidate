using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyPhrases.Commands
{
    public class AddEmergencyPhrases : IRequest<Result>
    {
        public string PhraseText { get; set; }
    }

    public class AddEmergencyPhrasesValidator
     : AbstractValidator<AddEmergencyPhrases>
    {
        public AddEmergencyPhrasesValidator()
        {
            RuleFor(v => v.PhraseText)
               .NotEmpty();
        }
    }

    public class AddEmergencyPhrasesHandler
     : IRequestHandler<AddEmergencyPhrases, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddEmergencyPhrasesHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(AddEmergencyPhrases request,
            CancellationToken cancellationToken)
        {
            _context.EmergencyPhrases.Add(new EmergencyPhrase()
            {
                UserEmail = _currentUserService.UserId,
                PhraseText = request.PhraseText,
                IsActive = false
            });

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
