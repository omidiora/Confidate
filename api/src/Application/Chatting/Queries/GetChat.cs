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
    public class GetChat : IRequest<PaginatedList<ChatDto>>
    {
        public int ConversationId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetChatHandler
        : IRequestHandler<GetChat, PaginatedList<ChatDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetChatHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<ChatDto>> Handle(
            GetChat request, CancellationToken cancellationToken)
        {
            return await _context.Chats
                    .Where(a => a.ConversationId == request.ConversationId)
                    .OrderByDescending(a => a.Id)
                    .ProjectTo<ChatDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
