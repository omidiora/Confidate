using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyPhrases.Commands
{
    public class ActivateEmergencyPhrases : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class ActivateEmergencyPhrasesValidator
   : AbstractValidator<ActivateEmergencyPhrases>
    {
        public ActivateEmergencyPhrasesValidator()
        {
            RuleFor(v => v.Id)
               .NotEmpty();
        }
    }

    public class ActivateEmergencyPhrasesHandler
     : IRequestHandler<ActivateEmergencyPhrases, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public ActivateEmergencyPhrasesHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(ActivateEmergencyPhrases request,
            CancellationToken cancellationToken)
        {
            var phrases = await _context.EmergencyPhrases
                                .Where(a => a.UserEmail == _currentUserService.UserId)
                                .ToListAsync(cancellationToken);

            var selectedPhrase = phrases.Where(a => a.Id == request.Id).FirstOrDefault();
            if(selectedPhrase == null) return Result.Failure(new string[] { "PHRASE_NOT_FOUND" });

            phrases.ForEach(a => a.IsActive = false);
            selectedPhrase.IsActive = true;

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
