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
    public class UpdateProfileCommand : IRequest<Result>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string AboutMe { get; set; }
        public string Address { get; set; }
        public string Education { get; set; }
        public string JobTitle { get; set; }
        public decimal? Height { get; set; }
        public string HeightUOM { get; set; }
        public decimal? Weight { get; set; }
        public string WeightUOM { get; set; }
        public string ProfileImage { get; set; }
    }

    public class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
    {
        public UpdateProfileCommandValidator()
        {
            RuleFor(v => v.Name)
                .NotEmpty();
            RuleFor(x => x.Gender).IsEnumName(typeof(Gender))
                    .WithMessage("Gender should be one of MALE, FEMALE or TRANS");
            RuleFor(x => x.WeightUOM).IsEnumName(typeof(WeightUOM))
                    .WithMessage("Gender should be one of KG or POUNDS");
            RuleFor(x => x.HeightUOM).IsEnumName(typeof(HeightUOM))
                    .WithMessage("Gender should be one of METERS or CENTIMETERS");
        }
    }

    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public UpdateProfileCommandHandler(IApplicationDbContext context,
            ICurrentUserService currentUser
            )
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Result> Handle(UpdateProfileCommand request,
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

            dbUser.Name = request.Name;
            dbUser.PhoneNumber = request.PhoneNumber;
            dbUser.DateOfBirth = request.DateOfBirth;
            dbUser.Gender = (Gender)Enum.Parse(typeof(Gender), request.Gender);
            dbUser.AboutMe = request.AboutMe;
            dbUser.Address = request.Address;
            dbUser.Education = request.Education;
            dbUser.JobTitle = request.JobTitle;
            dbUser.Height = request.Height;
            dbUser.HeightUOM = (HeightUOM)Enum.Parse(typeof(HeightUOM), request.HeightUOM);
            dbUser.Weight = request.Weight;
            dbUser.WeightUOM = (WeightUOM)Enum.Parse(typeof(WeightUOM), request.WeightUOM);
            dbUser.ProfileImage = request.ProfileImage;

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
