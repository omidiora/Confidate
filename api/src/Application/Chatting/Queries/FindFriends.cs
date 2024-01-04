using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Chatting.Queries
{
    public class FindFriendsResponse : IMapFrom<User>
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string ProfileImage { get; set; }
    }

    public class FindFriends : IRequest<List<FindFriendsResponse>>
    {
        public string[] Numbers { get; set; }
    }

    public class FindFriendsHandler
       : IRequestHandler<FindFriends, List<FindFriendsResponse>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public FindFriendsHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser
            )
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<List<FindFriendsResponse>> Handle(
            FindFriends request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Where(a => a.Email == _currentUser.UserId)
                .FirstOrDefaultAsync(cancellationToken);
            var friends =  await _context.Users
                .Where(a => request.Numbers.Contains(a.PhoneNumber))
                .ProjectTo<FindFriendsResponse>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            return friends.Where(a => a.PhoneNumber != user.PhoneNumber).ToList();
        }
    }
}
