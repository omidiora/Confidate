using Confidate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Infrastructure.Persistence.Configurations
{
    public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
    {
        public void Configure(EntityTypeBuilder<Conversation> builder)
        {
            
        }
    }

    public class ConversationPartiesConfiguration : IEntityTypeConfiguration<ConversationParty>
    {
        public void Configure(EntityTypeBuilder<ConversationParty> builder)
        {
            builder.HasIndex(a => a.PhoneNumber);
            builder.HasIndex(a => a.UserEmail);
        }
    }

    public class ChatConfiguration : IEntityTypeConfiguration<Chat>
    {
        public void Configure(EntityTypeBuilder<Chat> builder)
        {
            builder.HasIndex(a => a.ConversationId);
            builder.Property(a => a.From).HasColumnType("jsonb");
            builder.Property(a => a.IsDeleted).HasDefaultValue(false);
        }
    }
}
