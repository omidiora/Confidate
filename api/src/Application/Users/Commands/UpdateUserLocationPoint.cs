using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands
{
    public class UpdateUserLocationPoint : IRequest<Result>
    {
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Description { get; set; }
    }

    public class UpdateUserLocationPointValidator : AbstractValidator<UpdateUserLocationPoint>
    {
        public UpdateUserLocationPointValidator()
        {
            RuleFor(v => v.Latitude)
               .NotEmpty();
            RuleFor(v => v.Longitude)
               .NotEmpty();
        }
    }

    public class UpdateUserLocationPointHandler
   : IRequestHandler<UpdateUserLocationPoint, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UpdateUserLocationPointHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(UpdateUserLocationPoint request,
            CancellationToken cancellationToken)
        {
            _context.UserPoints.Add(new UserPoint()
            {
                UserEmail = _currentUserService.UserId,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                Description = request.Description
            });

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
