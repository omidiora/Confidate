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
    public class UpdateTrackingConsent : IRequest<Result>
    {
        public bool AllowLocationTracking { get; set; }
    }

    public class UpdateTrackingConsentHandler
   : IRequestHandler<UpdateTrackingConsent, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UpdateTrackingConsentHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(UpdateTrackingConsent request,
            CancellationToken cancellationToken)
        {
            var user = await _context.Users
                                .Where(a => a.Email == _currentUserService.UserId)
                                .FirstOrDefaultAsync(cancellationToken);

            user.AllowLocationTracking = request.AllowLocationTracking;
            
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
