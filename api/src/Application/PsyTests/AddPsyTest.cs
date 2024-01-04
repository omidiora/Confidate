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

namespace Confidate.Application.PsyTests
{
    public class AddPsyTest : IRequest<Result>
    {
        public string Title { get; set; }
        public string SourceLink { get; set; }
        public string Description { get; set; }
        public string Procedure { get; set; }
        public string Participation { get; set; }
    }

    public class AddPsyTestValidator : AbstractValidator<AddPsyTest>
    {
        public AddPsyTestValidator()
        {
            RuleFor(a => a.SourceLink).NotEmpty();
        }
    }

    public class AddPsyTestCommandHandler
     : IRequestHandler<AddPsyTest, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddPsyTestCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            AddPsyTest request, CancellationToken cancellationToken)
        {
            _context.PsyTests.Add(new PsyTest()
            {
                Title = request.Title,
                IsActive = true,
                SourceLink = request.SourceLink,
                Description = request.Description,
                Participation = request.Participation,
                Procedure = request.Procedure
            });

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
