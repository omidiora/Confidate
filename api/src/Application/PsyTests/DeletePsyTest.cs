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
    public class DeletePsyTest : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class DeletePsyTestValidator : AbstractValidator<DeletePsyTest>
    {
        public DeletePsyTestValidator()
        {
            RuleFor(a => a.Id).NotEmpty();
        }
    }

    public class DeletePsyTestCommandHandler
     : IRequestHandler<DeletePsyTest, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public DeletePsyTestCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService
         )
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(
            DeletePsyTest request, CancellationToken cancellationToken)
        {
            var tes = await _context.PsyTests.Where(a => a.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);
            if (tes == null)
            {
                return Result.Failure(new string[] { "TEST_NOT_FOUND" });
            }

            _context.PsyTests.Remove(tes);

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
    }
}
