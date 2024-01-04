using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands
{
    public class BlockUser : IRequest<Result>
    {
        public int UserId { get; set; }
    }

    public class BlockUserHandler
   : IRequestHandler<BlockUser, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public BlockUserHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(BlockUser request,
            CancellationToken cancellationToken)
        {
            if (_currentUserService.IsAdmin)
            {
                var user = await _context.Users
                                .Where(a => a.Id == request.UserId)
                                .FirstOrDefaultAsync(cancellationToken);

                user.Status = "BLOCKED";

                await _context.SaveChangesAsync(cancellationToken);
            }
            return Result.Success();
        }
    }
}
