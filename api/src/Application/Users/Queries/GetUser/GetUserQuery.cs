using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Queries.GetUser
{

    public class GetUserQuery : IRequest<UserDto>
    {

    }

    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUserQueryHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<UserDto> Handle(GetUserQuery request,
            CancellationToken cancellationToken)
        {
            return await _context.Users.Include(u => u.Roles)
                        .Where(a => a.Email == _currentUser.UserId)
                        .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
