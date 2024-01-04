using Confidate.Domain.Common;
using Confidate.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Domain.Entities
{
    public class UserDate : AuditableEntity
    {
        public int Id { get; set; }
        public int  UserId { get; set; }
        public string UserEmail { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public Gender Gender { get; set; }
        public string Address { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string PhoneNumber { get; set; }
    }
}
