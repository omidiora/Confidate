using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using Confidate.Application.Users.Queries.GetUser;
using Confidate.Domain.Enums;
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
    public class GetDateHistoryForAdmin : IRequest<PaginatedList<UserDatesDto>>
    {

        public string Name { get; set; }
        public string UserEmail { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public DateTime CreatedFrom { get; set; }
        public DateTime CreatedTo { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetDateHistoryForAdminHandler : IRequestHandler<GetDateHistoryForAdmin, PaginatedList<UserDatesDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetDateHistoryForAdminHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<UserDatesDto>> Handle(GetDateHistoryForAdmin request,
            CancellationToken cancellationToken)
        {
            var query = _context.UserDates.Select(a => a);

            if (!string.IsNullOrEmpty(request.UserEmail))
            {
                query = query.Where(a => a.UserEmail.Contains(request.UserEmail));
            }

            if (!string.IsNullOrEmpty(request.Name))
            {
                query = query.Where(a => a.Name.Contains(request.Name));
            }

            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                query = query.Where(a => a.PhoneNumber.Contains(request.PhoneNumber));
            }

            if (request.CreatedFrom != DateTime.MinValue && request.CreatedTo != DateTime.MinValue)
            {
                query = query.Where(a =>
                                a.DateFrom.Month >= request.CreatedFrom.Month
                                && a.DateFrom.Year >= request.CreatedFrom.Year);
                query = query.Where(a =>
                                a.DateFrom.Month <= request.CreatedTo.Month
                                && a.DateFrom.Year <= request.CreatedTo.Year);

            }

            return await query
            .OrderByDescending(a => a.Id)
            .ProjectTo<UserDatesDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
