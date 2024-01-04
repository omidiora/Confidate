using Confidate.Domain.Common;
using Confidate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class Chat : AuditableEntity
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public ConversationParty From { get; set; }
        public string Message { get; set; }
        public string[] Photos { get; set; }
        public string[] Videos { get; set; }
        public bool IsRead { get; set; }
        public bool IsDeleted { get; set; }
    }
}
