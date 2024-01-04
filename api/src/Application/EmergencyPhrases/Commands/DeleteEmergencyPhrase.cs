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
    public class DeleteEmergencyPhrases : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class DeleteEmergencyPhrasesValidator
  : AbstractValidator<DeleteEmergencyPhrases>
    {
        public DeleteEmergencyPhrasesValidator()
        {
            RuleFor(v => v.Id)
               .NotEmpty();
        }
    }

    public class DeleteEmergencyPhrasesHandler
    : IRequestHandler<DeleteEmergencyPhrases, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DeleteEmergencyPhrasesHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(DeleteEmergencyPhrases request,
            CancellationToken cancellationToken)
        {
            var selected = await _context.EmergencyPhrases
            .Where(a => a.UserEmail == _currentUserService.UserId && a.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

            if (selected == null) return Result.Failure(new string[] { "PHRASE_NOT_FOUND" });

            _context.EmergencyPhrases.Remove(selected);

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
