using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands.CreateUser
{
    public class UpdateProfilePicCommand : IRequest<Result>
    {
        public string ProfileImage { get; set; }
    }

    public class UpdateProfilePicCommandValidator : AbstractValidator<UpdateProfilePicCommand>
    {
        public UpdateProfilePicCommandValidator()
        {
            RuleFor(v => v.ProfileImage)
                .NotEmpty();
        }
    }

    public class UpdateProfilePicCommandHandler : IRequestHandler<UpdateProfilePicCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public UpdateProfilePicCommandHandler(IApplicationDbContext context,
            ICurrentUserService currentUser
            )
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Result> Handle(UpdateProfilePicCommand request,
            CancellationToken cancellationToken)
        {
            var email = _currentUser.UserId.ToLowerInvariant();
            var dbUser = await _context.Users
                .Where(u => u.Email == email)
                .FirstOrDefaultAsync(cancellationToken);

            if (dbUser == null)
            {
                return Result.Failure(new string[] { "USER_NOT_FOUND" });
            }
            dbUser.ProfileImage = request.ProfileImage;
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
