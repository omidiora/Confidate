using Confidate.Application.Common.Mappings;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.Chatting.Queries
{
    public class ConversationDto : IMapFrom<Conversation>
    {
        public int Id { get; set; }
        public List<ConversationPartyDto> Parties { get; set; }
        //public List<ChatDto> Chats { get; set; }
        public Chat LatestChat { get; set; }
        //public int UnreadCount { get; set; }
    }

    public class ConversationPartyDto : IMapFrom<ConversationParty>
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public string UserEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string ProfileImage { get; set; }
    }

    public class ChatDto : IMapFrom<Chat>
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public ConversationParty From { get; set; }
        public string Message { get; set; }
        public string[] Photos { get; set; }
        public string[] Videos { get; set; }
        public DateTime Created { get; set; }
        public bool IsDeleted { get; set; }
    }
}
