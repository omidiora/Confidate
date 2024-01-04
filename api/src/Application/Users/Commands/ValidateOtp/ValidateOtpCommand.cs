using Confidate.Application.Common.Interfaces;
using Confidate.Domain.Entities;
using Confidate.Domain.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands.ValidateOtp
{
    public class ValidateOtp
    {
        public bool Result { get; set; }
        public string UserStatus { get; set; }
        public string Token { get; set; }
    }

    public class ValidateOtpCommand : IRequest<ValidateOtp>
    {
        public string OTP { get; set; }
        public string Email { get; set; }
    }

    public class ValidateOtpCommandValidator : AbstractValidator<ValidateOtpCommand>
    {
        public ValidateOtpCommandValidator()
        {
            RuleFor(v => v.Email)
                .NotEmpty();
            RuleFor(v => v.OTP)
               .NotEmpty();
        }
    }

    public class ValidateOtpCommandHandler : IRequestHandler<ValidateOtpCommand, ValidateOtp>
    {
        private readonly IApplicationDbContext _context;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public ValidateOtpCommandHandler(
            IApplicationDbContext context,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<ValidateOtp> Handle(ValidateOtpCommand request,
            CancellationToken cancellationToken)
        {
            var response = new ValidateOtp()
            {
                Result = false,
            };
            var email = request.Email.ToLowerInvariant();
            var user = await _context.Users
                        .Include(u => u.Roles)
                        .Where(u => u.Email == email)
                        .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                return response;
            }

            if (isValidOtp(user, request.OTP))
            {
                response.Result = true;

                if (user.Status == "PENDING_ACTIVATION")
                {
                    user.Status = GetNewStatus(user);
                }

                user.OTP = string.Empty;
                await _context.SaveChangesAsync(cancellationToken);

                response.UserStatus = user.Status;
                var roles = user.Roles.Select(r => r.Role).Cast<Role>()
                            .Select(r => r.ToString()).ToArray();
                response.Token = await _jwtTokenGenerator.CreateToken(user.Email, roles);
            }
            return response;
        }

        private bool isValidOtp(User user, string otp)
        {
            return user.OTP.Split(":")[0] == otp;
        }

        private string GetNewStatus(User user)
        {
            return "ACTIVE";
        }
    }
}
