using Confidate.Application.Common.Exceptions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using Confidate.Domain.Enums;
using Confidate.Domain.Events;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands.CreateUser
{
    public class CreateUserCommand : IRequest<Result>
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }

    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(v => v.Email)
               .EmailAddress();
            RuleFor(v => v.Password)
                .NotEmpty();
        }
    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly IPasswordHasher _passwordHasher;

        public CreateUserCommandHandler(IApplicationDbContext context,
            IPasswordHasher passwordHasher
            )
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<Result> Handle(CreateUserCommand request,
            CancellationToken cancellationToken)
        {
            var email = request.Email.ToLowerInvariant();
            var dbUser = await _context.Users
                .Where(u => u.Email == email || u.PhoneNumber == request.PhoneNumber)
                .FirstOrDefaultAsync(cancellationToken);

            if (dbUser != null && dbUser.Status == "ACTIVE")
            {
                if (dbUser.Email == email) return Result.Failure(new string[] { "USER_EMAIL_EXISTS" });
                if (dbUser.PhoneNumber == request.PhoneNumber) return Result.Failure(new string[] { "USER_PHONE_EXISTS" });
                return Result.Failure(new string[] { "USER_EXISTS" });
            }

            if(dbUser != null && dbUser.Status == "PENDING_ACTIVATION")
            {
                var salt = Guid.NewGuid().ToByteArray();
                dbUser.Hash = _passwordHasher.Hash(request.Password, salt);
                dbUser.Salt = salt;
                dbUser.OTP = GetOTP();
                dbUser.PhoneNumber = request.PhoneNumber;
                dbUser.DomainEvents.Add(new UserAdded(dbUser));
                await _context.SaveChangesAsync(cancellationToken);
            }
            else
            {
                await AddNewUser(request, cancellationToken);
            }
            return Result.Success();
        }

        private async Task AddNewUser(CreateUserCommand request,
            CancellationToken cancellationToken)
        {
            var salt = Guid.NewGuid().ToByteArray();
            var email = request.Email.ToLowerInvariant();
            var entity = new User
            {
                Email = email,
                PhoneNumber = request.PhoneNumber,
                Hash = _passwordHasher.Hash(request.Password, salt),
                Salt = salt,
                Status = GetUserStatus(),
                OTP = GetOTP(),
                Roles = GetRoles(request),
            };

            _context.Users.Add(entity);
            entity.DomainEvents.Add(new UserAdded(entity));
            await _context.SaveChangesAsync(cancellationToken);
        }

        private static string GetUserStatus()
        {
            return "PENDING_ACTIVATION";
        }

        private static string GetOTP()
        {
            Random rnd = new();
            return rnd.Next(999, 9999).ToString()
                + ":" + DateTimeOffset.Now.ToUnixTimeSeconds().ToString();
        }

        private List<UserRole> GetRoles(CreateUserCommand request)
        {
            List<UserRole> roles = new()
            {
                new UserRole { Role = Role.User }
            };

            return roles;
        }
    }
}
