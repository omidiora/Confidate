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
    public class GetUsersDashboardResponse
    {
        public int TotalUsers { get; set; }
        public int TotalMales { get; set; }
        public int TotalFemales { get; set; }
    }

    public class GetUsersDashboard : IRequest<GetUsersDashboardResponse>
    {
        public DateTime CreatedDate { get; set; }
    }

    public class GetUsersDashboardHandler : 
        IRequestHandler<GetUsersDashboard, GetUsersDashboardResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetUsersDashboardHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<GetUsersDashboardResponse> Handle(GetUsersDashboard request,
            CancellationToken cancellationToken)
        {
            var query = _context.Users
                            .Where(a =>
                                a.Created.Month == request.CreatedDate.Month
                                && a.Created.Year == request.CreatedDate.Year
                             );

            var userCount = await query.CountAsync(cancellationToken);
            var males = await query
                .Where(a => a.Gender == Gender.MALE).CountAsync(cancellationToken);
            var females = await query
                .Where(a => a.Gender == Gender.FEMALE).CountAsync(cancellationToken);

            return new GetUsersDashboardResponse()
            {
                TotalUsers = userCount,
                TotalFemales = females,
                TotalMales = males
            };
        }
    }
}
