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
    public class UserPointsConfiguration : IEntityTypeConfiguration<UserPoint>
    {
        public void Configure(EntityTypeBuilder<UserPoint> builder)
        {
            builder.Property(t => t.UserEmail)
                .IsRequired();
            builder.HasIndex(a => a.UserEmail);
        }
    }
}
