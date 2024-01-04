using Confidate.Application.Common.Mappings;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyMessages.Queries
{
    public class EmergencyMessageDto : IMapFrom<EmergencyMessage>
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Message { get; set; }
    }
}
