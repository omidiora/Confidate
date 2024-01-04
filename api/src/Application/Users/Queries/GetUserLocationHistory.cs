using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using Confidate.Application.Users.Queries.GetUser;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Queries
{
    public class GetUserLocationHistory : IRequest<PaginatedList<UserPointDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }

    public class GetCatalogQueryHandler : IRequestHandler<GetUserLocationHistory, PaginatedList<UserPointDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetCatalogQueryHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<UserPointDto>> Handle(GetUserLocationHistory request,
            CancellationToken cancellationToken) => await _context.UserPoints
            .Where(a => a.Created >= request.DateFrom & a.Created <= request.DateTo)
            .OrderByDescending(a => a.Id)
            .ProjectTo<UserPointDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
