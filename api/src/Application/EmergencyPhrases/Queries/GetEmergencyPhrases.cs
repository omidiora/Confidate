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

namespace Confidate.Application.EmergencyPhrases.Queries
{
    public class GetEmergencyPhrases : IRequest<PaginatedList<EmergencyPhrasesDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetEmergencyPhrasesHandler
        : IRequestHandler<GetEmergencyPhrases, PaginatedList<EmergencyPhrasesDto>>
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

        public async Task<PaginatedList<EmergencyPhrasesDto>> Handle(
            GetEmergencyPhrases request, CancellationToken cancellationToken) => 
            await _context.EmergencyPhrases
            .Where(a => a.UserEmail == _currentUser.UserId)
            .OrderBy(a => a.Id)
            .ProjectTo<EmergencyPhrasesDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
