using Confidate.Application.Common.Interfaces;
using Confidate.Application.Common.Models;
using Confidate.Domain.Entities;
using Confidate.Domain.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confidate.Application.Users.Commands
{
    public class AddUserDates : IRequest<Result>
    {
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class AddUserDatesValidator : AbstractValidator<AddUserDates>
    {
        public AddUserDatesValidator()
        {
            RuleFor(a => a.Name).NotEmpty();
            RuleFor(a => a.DateTo).NotEmpty();
            RuleFor(a => a.DateFrom).NotEmpty();
        }
    }

    public class AddUserDatesHandler
   : IRequestHandler<AddUserDates, Result>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddUserDatesHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Result> Handle(AddUserDates request,
            CancellationToken cancellationToken)
        {
            var user = await _context.Users
                                .Where(a => a.Email == _currentUserService.UserId)
                                .FirstOrDefaultAsync(cancellationToken);

            _context.UserDates.Add(new UserDate()
            {
                Name = request.Name,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber,
                Age = request.Age,
                Gender = (Gender)Enum.Parse(typeof(Gender), request.Gender),
                DateFrom = request.DateFrom,
                DateTo = request.DateTo,
                UserEmail = _currentUserService.UserId,
                UserId = user.Id,
            });

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}
