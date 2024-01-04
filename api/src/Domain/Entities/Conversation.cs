using Confidate.Domain.Common;
using Confidate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class Conversation : AuditableEntity
    {
        public Conversation()
        {
            Parties = new();
            Chats = new();
        }

        public int Id { get; set; }
        public List<ConversationParty> Parties { get; set; }
        public List<Chat> Chats { get; set; }
    }

    public class ConversationParty
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public string UserEmail { get; set; }
        public string PhoneNumber { get; set; }
    }
}
