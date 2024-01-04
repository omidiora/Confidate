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

namespace Confidate.Application.Notifications.Queries.GetNotifications
{
    public class GetNotificationsQuery : IRequest<PaginatedList<NotificationDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetNotificationsQueryHandler : IRequestHandler<GetNotificationsQuery, PaginatedList<NotificationDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetNotificationsQueryHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<NotificationDto>> Handle(GetNotificationsQuery request,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            //    await _context.Notifications
            //.Where(a => a.UserEmail == _currentUser.UserId)
            //  .OrderByDescending(a => a.Id)
            //  .ProjectTo<NotificationDto>(_mapper.ConfigurationProvider)
            //.PaginatedListAsync(request.PageNumber, request.PageSize)
            throw new NotImplementedException();
        }
    }
}
