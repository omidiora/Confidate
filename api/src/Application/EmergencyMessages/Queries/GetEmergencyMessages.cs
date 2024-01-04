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

namespace Confidate.Application.EmergencyMessages.Queries
{
    public class GetEmergencyMessages : IRequest<PaginatedList<EmergencyMessageDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetEmergencyMessagesHandler : IRequestHandler<GetEmergencyMessages, PaginatedList<EmergencyMessageDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetEmergencyMessagesHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<EmergencyMessageDto>> Handle(
            GetEmergencyMessages request, CancellationToken cancellationToken) =>
            await _context.EmergencyMessages
            .Where(a => a.UserEmail == _currentUser.UserId)
            .OrderBy(a => a.Id)
            .ProjectTo<EmergencyMessageDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
