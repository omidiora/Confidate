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
    public class RequestOtpCommand : IRequest<Result>
    {
        public string Email { get; set; }
    }

    public class RequestOtpCommandValidator : AbstractValidator<RequestOtpCommand>
    {
        public RequestOtpCommandValidator()
        {
            RuleFor(v => v.Email)
               .NotEmpty();
        }
    }

    public class RequestOtpCommandHandler
    : IRequestHandler<RequestOtpCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public RequestOtpCommandHandler(
            IApplicationDbContext context,
            IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<Result> Handle(
          RequestOtpCommand request,
          CancellationToken cancellationToken)
        {
            var userEmail = request.Email.ToLowerInvariant();
            var user = await _context.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                return Result.Failure(new string[] { "USER_NOT_FOUND" });
            }

            user.OTP = GetOTP();
            await _context.SaveChangesAsync(cancellationToken);

            await _emailService.SendEmail(new EmailModel()
            {
                ToAddress = userEmail,
                TemplateId = EmailTemplates.OTPEmail,
                TemplateData = new
                {
                    OTP = user.OTP.Split(":")[0],
                },
            });
            return Result.Success();
        }

        private string GetOTP()
        {
            Random rnd = new Random();
            return rnd.Next(999, 9999).ToString() + ":" + DateTimeOffset.Now.ToUnixTimeSeconds().ToString();
        }
    }
}
