using AutoMapper;
using AutoMapper.QueryableExtensions;
using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Mappings;
using Confidate.Application.Common.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.PsyTests
{
    public class GetPsyTests : IRequest<PaginatedList<PsyTestDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetPsyTestsHandler : IRequestHandler<GetPsyTests, PaginatedList<PsyTestDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetPsyTestsHandler(IApplicationDbContext context,
            IMapper mapper,
            ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<PaginatedList<PsyTestDto>> Handle(GetPsyTests request,
            CancellationToken cancellationToken) => await _context.PsyTests
            .Where(a => a.IsActive == true)
            .OrderBy(a => a.Id)
            .ProjectTo<PsyTestDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
