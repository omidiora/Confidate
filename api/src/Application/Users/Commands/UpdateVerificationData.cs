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
    public class UpdateVerificationData : IRequest<Result>
    {
        public bool IsVerified { get; set; }
        public string Response { get; set; }
    }

    public class UpdateVerificationDataValidator : AbstractValidator<UpdateVerificationData>
    {
        public UpdateVerificationDataValidator()
        {

        }
    }

    public class UpdateVerificationDataHandler
   : IRequestHandler<UpdateVerificationData, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UpdateVerificationDataHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(UpdateVerificationData request,
            CancellationToken cancellationToken)
        {
            var user = await _context.Users
                        .Where(a => a.Email == _currentUserService.UserId)
                        .FirstOrDefaultAsync(cancellationToken);
            if(user == null)
            {
                return Result.Failure(new string[] { "USER_NOT_FOUND" });
            }

            user.IsVerified = request.IsVerified;

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
