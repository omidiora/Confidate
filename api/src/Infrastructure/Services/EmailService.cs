using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ISendGridClient _sendGridClient;
        public EmailService(IConfiguration configuration, ISendGridClient sendGridClient)
        {
            _configuration = configuration;
            _sendGridClient = sendGridClient;
        }

        public async Task SendEmail(EmailModel data)
        {
            var msg = new SendGridMessage();
            msg.AddTo(new EmailAddress(data.ToAddress));
            msg.SetFrom(new EmailAddress(_configuration.GetValue<string>("DefaultSenderEmail")));
            msg.SetTemplateId(data.TemplateId);
            msg.SetTemplateData(data.TemplateData);
            await _sendGridClient.SendEmailAsync(msg);
        }
    }
}
