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
    public class GetUserGallery : IRequest<List<string>>
    {
       
    }

    public class GetUserGalleryHandler : 
        IRequestHandler<GetUserGallery, List<string>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUserGalleryHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<List<string>> Handle(GetUserGallery request,
            CancellationToken cancellationToken)
        {
            var gal = new List<string>();
            var userpic = await _context.Users
                            .Where(a => a.Email == _currentUser.UserId)
                            .Select(a => a.ProfileImage)
                            .FirstOrDefaultAsync(cancellationToken);

            if (userpic != null) gal.Add(userpic);

            var ids = await _context.ConversationParties
                        .Where(a => a.UserEmail == _currentUser.UserId)
                        .AsNoTracking()
                        .Select(a => a.ConversationId)
                        .ToArrayAsync(cancellationToken);

            var chatpics = await _context.Chats
                            .Where(a => ids.Contains(a.ConversationId))
                            .Select(a => a.Photos)
                            .ToListAsync(cancellationToken);

            foreach(var pi in chatpics)
            {
                if(pi != null)
                {
                    foreach (var p in pi)
                    {
                        gal.Add(p);
                    }
                }
            }

            return gal;
        }
    }
}
