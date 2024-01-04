using Confidate.Application.Common.Exceptions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands.Login
{
    public class LoginEnvelope
    {
        public string Token { get; set; }
        public string[] Roles { get; set; }
        public string UserStatus { get; set; }
    }

    public class LoginCommand : IRequest<Result>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(v => v.Email)
                .NotEmpty();
            RuleFor(v => v.Password)
               .NotEmpty();
        }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IPasswordHasher _passwordHasher;

        public LoginCommandHandler(IApplicationDbContext context,
            IJwtTokenGenerator jwtTokenGenerator,
            IPasswordHasher passwordHasher)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
            _passwordHasher = passwordHasher;
        }

        public async Task<Result> Handle(LoginCommand request,
            CancellationToken cancellationToken)
        {
            var email = request.Email.ToLowerInvariant();
            var user = await _context.Users
                .Where(u => u.Email == email)
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null || user.Hash == null)
            {
                return Result.Failure(new string[] { "INVALID_USER" });
            }

            if (!user.Hash.SequenceEqual(_passwordHasher.Hash(request.Password, user.Salt)))
            {
                return Result.Failure(new string[] { "INVALID_LOGINS" });
            }

            if (user.Status == "BLOCKED"
                || user.Status == "PENDING_ACTIVATION")
            {
                return Result.Failure(new string[] { "USER_NOT_ACTIVE" });
            }

            var roles = user.Roles.Select(r => r.Role).Cast<Role>()
                        .Select(r => r.ToString()).ToArray();

            return Result.Success(new LoginEnvelope()
            {
                Token = await _jwtTokenGenerator.CreateToken(user.Email, roles),
                Roles = roles,
                UserStatus = user.Status
            });
        }
    }
}
