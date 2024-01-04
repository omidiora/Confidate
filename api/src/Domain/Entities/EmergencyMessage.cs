using Confidate.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class EmergencyMessage : AuditableEntity
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public bool IsActive { get; set; }
        public string Message { get; set; }
    }
}
