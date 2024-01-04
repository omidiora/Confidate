using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Confidate.Infrastructure.Services
{
    public class SmsService : ISmsService
    {
        private readonly IConfiguration _configuration;

        public SmsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task Send(SmsDto data)
        {
            string accountSid = _configuration.GetValue<string>("TWILIO_ACCOUNT_SID");
            string authToken = _configuration.GetValue<string>("TWILIO_AUTH_TOKEN");
            string from = _configuration.GetValue<string>("TWILIO_PHONE_NUMBER");

            TwilioClient.Init(accountSid, authToken);

            var postTasks = data.To.Select(number =>
                MessageResource.CreateAsync(
                   body: data.Message,
                   from: new Twilio.Types.PhoneNumber(from),
                   to: new Twilio.Types.PhoneNumber(number)
               ));

            var results = await Task.WhenAll(postTasks);

            foreach (var postContent in results)
            {
                Console.WriteLine(postContent);
            }
        }
    }
}
