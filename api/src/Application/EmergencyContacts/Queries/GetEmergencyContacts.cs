using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.EmergencyContacts.Queries
{
    public class GetEmergencyContacts : IRequest<PaginatedList<EmergencyContactsDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetEmergencyPhrasesHandler
        : IRequestHandler<GetEmergencyContacts, PaginatedList<EmergencyContactsDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetEmergencyPhrasesHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<EmergencyContactsDto>> Handle(
            GetEmergencyContacts request, CancellationToken cancellationToken) => 
            await _context.EmergencyContacts
            .Where(a => a.UserEmail == _currentUser.UserId)
            .OrderBy(a => a.Id)
            .ProjectTo<EmergencyContactsDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
