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
    public class EmergencyMessageConfiguration : IEntityTypeConfiguration<EmergencyMessage>
    {
        public void Configure(EntityTypeBuilder<EmergencyMessage> builder)
        {
            builder.Property(t => t.UserEmail)
                .IsRequired();
            builder.HasIndex(a => a.UserEmail);
        }
    }

    public class EmergencyContactsConfiguration : IEntityTypeConfiguration<EmergencyContact>
    {
        public void Configure(EntityTypeBuilder<EmergencyContact> builder)
        {
            builder.Property(t => t.UserEmail)
                .IsRequired();
            builder.HasIndex(a => a.UserEmail);
        }
    }

    public class EmergencyPharseConfiguration : IEntityTypeConfiguration<EmergencyPhrase>
    {
        public void Configure(EntityTypeBuilder<EmergencyPhrase> builder)
        {
            builder.Property(t => t.UserEmail)
                .IsRequired();
            builder.HasIndex(a => a.UserEmail);
        }
    }
}
