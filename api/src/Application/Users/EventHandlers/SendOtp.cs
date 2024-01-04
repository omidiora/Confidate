using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Events;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands.EventHandlers
{
    public class SendOtp : INotificationHandler<DomainEventNotification<UserAdded>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public SendOtp(IApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task Handle(DomainEventNotification<UserAdded> notification,
            CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;
            await _emailService.SendEmail(new EmailModel()
            {
                ToAddress = domainEvent.User.Email,
                TemplateId = EmailTemplates.OTPEmail,
                TemplateData = new
                {
                    OTP = domainEvent.User.OTP.Split(":")[0],
                },
            });
        }
    }
}
