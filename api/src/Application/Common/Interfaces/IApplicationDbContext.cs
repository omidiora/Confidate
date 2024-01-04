using Confidate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; set; }

        DbSet<UserRole> UserRoles { get; set; }
        DbSet<UserPoint> UserPoints { get; set; }
        DbSet<EmergencyContact> EmergencyContacts { get; set; }
        DbSet<EmergencyMessage> EmergencyMessages { get; set; }
        DbSet<EmergencyPhrase> EmergencyPhrases { get; set; }
        DbSet<UserVerification> UserVerifications { get; set; }
        DbSet<UserDate> UserDates { get; set; }
        DbSet<Conversation> Conversations { get; set; }
        DbSet<ConversationParty> ConversationParties { get; set; }
        DbSet<Chat> Chats { get; set; }
        DbSet<PsyTest> PsyTests { get; set; }

        //DbSet<Notification> Notifications { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
