using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.PsyTests
{
    public class UpdatePsyTest : IRequest<Result>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SourceLink { get; set; }
        public string Description { get; set; }
        public string Procedure { get; set; }
        public string Participation { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdatePsyTestValidator : AbstractValidator<UpdatePsyTest>
    {
        public UpdatePsyTestValidator()
        {
            RuleFor(a => a.SourceLink).NotEmpty();
        }
    }

    public class UpdatePsyTestCommandHandler
     : IRequestHandler<UpdatePsyTest, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UpdatePsyTestCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            UpdatePsyTest request, CancellationToken cancellationToken)
        {
            var tes = await _context.PsyTests.Where(a => a.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);
            if (tes == null)
            {
                return Result.Failure(new string[] { "TEST_NOT_FOUND" });
            }

            tes.Title = request.Title;
            tes.IsActive = request.IsActive;
            tes.SourceLink = request.SourceLink;
            tes.Description = request.Description;
            tes.Participation = request.Participation;
            tes.Procedure = request.Procedure;

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
