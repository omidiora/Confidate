using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.Common.Models
{
    public class EmailModel
    {
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public string TemplateId { get; set; }
        public object TemplateData { get; set; }
    }

    public static class EmailTemplates
    {
        public const string OTPEmail = "d-61af42030f9a4838953dc338a6d7e882";
    }
}
