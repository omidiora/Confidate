using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
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
    public class GetMyConversations : IRequest<PaginatedList<ConversationDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetMyConversationsHandler
    : IRequestHandler<GetMyConversations, PaginatedList<ConversationDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetMyConversationsHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<ConversationDto>> Handle(
            GetMyConversations request, CancellationToken cancellationToken)
        {
            var ids = await _context.ConversationParties
                        .Where(a => a.UserEmail == _currentUser.UserId)
                        .AsNoTracking()
                        .Select(a => a.ConversationId)
                        .ToArrayAsync(cancellationToken);

            var chatList =  (from cov in _context.Conversations
                join par in _context.ConversationParties on cov.Id equals par.ConversationId
                join usr in _context.Users on par.UserEmail equals usr.Email
                from cc in _context.Chats.Where(a => a.ConversationId == cov.Id)
                            .OrderByDescending(a => a.Id).Take(1).DefaultIfEmpty()
                where ids.Contains(cov.Id)
                    & par.UserEmail != _currentUser.UserId
                    & cc != null
                select new ConversationDto
                {
                    Id = cov.Id,
                    Parties = new List<ConversationPartyDto>()
                    {
                    new ConversationPartyDto(){
                        Id = par.Id,
                        ConversationId = par.ConversationId,
                        Name = usr.Name,
                        UserEmail = usr.Email,
                        PhoneNumber = usr.PhoneNumber,
                        ProfileImage = usr.ProfileImage
                    }
                    },
                    LatestChat = cc,
                });

            return await chatList 
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
