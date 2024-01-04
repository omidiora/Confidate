using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands
{
    public class ChangePasswordCommand : IRequest<Result>
    {
        public string OldPassword { get; set; }
        public string Password { get; set; }
    }

    public class ChangePasswordCommandValidator
      : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordCommandValidator()
        {
            RuleFor(v => v.Password)
               .NotEmpty();
        }
    }

    public class ChangePasswordCommandHandler
      : IRequestHandler<ChangePasswordCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ICurrentUserService _currentUserService;

        public ChangePasswordCommandHandler(
            IApplicationDbContext context,
            IPasswordHasher passwordHasher,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
          ChangePasswordCommand request,
          CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Where(u => u.Email == _currentUserService.UserId)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                return Result.Failure(new string[] { "USER_NOT_FOUND" });
            }

            if (request.OldPassword != null 
                && !user.Hash.SequenceEqual(
                    _passwordHasher.Hash(request.OldPassword, user.Salt)))
            {
                return Result.Failure(new string[] { "INVALID_PASSWORD" });
            }

            var salt = Guid.NewGuid().ToByteArray();
            user.Hash = _passwordHasher.Hash(request.Password, salt);
            user.Salt = salt;

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
