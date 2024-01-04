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
    public class DeleteUser : IRequest<Result>
    {
        public int UserId { get; set; }
    }

    public class DeleteUserHandler
   : IRequestHandler<DeleteUser, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DeleteUserHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(DeleteUser request,
            CancellationToken cancellationToken)
        {

            var user = await _context.Users
                            .Where(a => a.Email == _currentUserService.UserId)
                            .FirstOrDefaultAsync(cancellationToken);
            _context.Users.Remove(user);

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
