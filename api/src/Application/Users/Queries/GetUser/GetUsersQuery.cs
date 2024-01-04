using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using Confidate.Domain.Enums;
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

    public class GetUsersQuery : IRequest<PaginatedList<UserDto>>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public DateTime CreatedFrom { get; set; }
        public DateTime CreatedTo { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, PaginatedList<UserDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUsersQueryHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<UserDto>> Handle(GetUsersQuery request,
            CancellationToken cancellationToken)
        {
            var query = _context.Users.Select(a => a);

            if (!string.IsNullOrEmpty(request.Name))
            {
                query = query.Where(a => a.Name.Contains(request.Name));
            }

            if (!string.IsNullOrEmpty(request.Email))
            {
                query = query.Where(a => a.Email.Contains(request.Email));
            }

            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                query = query.Where(a => a.PhoneNumber.Contains(request.PhoneNumber));
            }

            if(request.Gender <= 0)
            {
                query = query.Where(a => a.Gender == request.Gender);
            }

            if (request.CreatedFrom != DateTime.MinValue && request.CreatedTo != DateTime.MinValue)
            {
                query = query.Where(a => a.Created.Year >= request.CreatedFrom.Year &&
                                a.Created.Month >= request.CreatedFrom.Month
                                );

                query = query.Where(a => a.Created.Year <= request.CreatedTo.Year &&
                                a.Created.Month <= request.CreatedTo.Month
                                );
            }

            return await query.Include(u => u.Roles)
                       .OrderBy(u => u.Id)
                       .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                       .PaginatedListAsync(request.PageNumber, request.PageSize);

        }
    }
}
