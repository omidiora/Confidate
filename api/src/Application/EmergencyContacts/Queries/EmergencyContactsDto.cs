using AutoMapper;
using Confidate.Application.Common.Mappings;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyContacts.Queries
{
    public class EmergencyContactsDto : IMapFrom<EmergencyContact>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<EmergencyContact, EmergencyContactsDto>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.ContactType));
        }
    }
}
