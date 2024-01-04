using Confidate.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class EmergencyContact : AuditableEntity
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string ContactType { get; set; } // NEIGHBOURS,COLLEAGUES,FRIENDS,FAMILY
        public string PhoneNumber { get; set; }
    }
}
