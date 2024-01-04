using Confidate.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class UserVerification : AuditableEntity
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public List<string> Photos { get; set; }
        public List<string> Videos { get; set; }
    }
}
