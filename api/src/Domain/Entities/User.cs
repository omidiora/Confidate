using Confidate.Domain.Common;
using Confidate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class User : AuditableEntity, IHasDomainEvent
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string AboutMe { get; set; }
        public string Address { get; set; }
        public string Education { get; set; }
        public string JobTitle { get; set; }
        public decimal? Height { get; set; }
        public HeightUOM HeightUOM { get; set; }
        public decimal? Weight { get; set; }
        public WeightUOM WeightUOM { get; set; }
        public string OTP { get; set; }
        public string Status { get; set; }
        public byte[] Hash { get; set; }
        public byte[] Salt { get; set; }
        public bool IsVerified { get; set; }
        public string ProfileImage { get; set; }
        public bool AllowLocationTracking { get; set; }
        public IList<UserRole> Roles { get; set; }
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
