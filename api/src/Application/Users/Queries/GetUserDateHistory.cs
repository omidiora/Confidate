using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using Confidate.Application.Users.Queries.GetUser;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Queries
{
    public class GetUserDateHistory : IRequest<PaginatedList<UserDatesDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetUserDateHistoryHandler : IRequestHandler<GetUserDateHistory, PaginatedList<UserDatesDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUserDateHistoryHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<UserDatesDto>> Handle(GetUserDateHistory request,
            CancellationToken cancellationToken) => await _context.UserDates
            .Where(a => a.UserEmail == _currentUser.UserId)
            .OrderByDescending(a => a.Id)
            .ProjectTo<UserDatesDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
