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
    public class UsersConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Ignore(e => e.DomainEvents);

            builder.Property(t => t.Email)
                .IsRequired();
            builder.HasIndex(a => a.Email);

            //builder.Property(a => a.Gender).HasDefaultValue(null);

            //builder.Property(a => a.AboutMe).HasColumnType("nvarchar(max)");
        }
    }
}