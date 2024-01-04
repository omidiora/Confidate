using AutoMapper;
using Confidate.Application.Common.Mappings;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Confidate.Application.Users.Queries.GetUser
{
    public class UserDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string Email { get; set; }
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
        public string OTP { get; set; }
        public string Status { get; set; }
        public bool IsVerified { get; set; }
        public string ProfileImage { get; set; }
        public bool AllowLocationTracking { get; set; }
        public IList<RoleDto> Roles { get; set; }
        public DateTime Created { get; set; }
    }

    public class RoleDto : IMapFrom<UserRole>
    {
        public string Role { get; set; }
    }

    public class UserPointDto : IMapFrom<UserPoint>
    {
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Description { get; set; }
        public DateTime UpdatedOn { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<UserPoint, UserPointDto>()
                .ForMember(d => d.UpdatedOn, opt => opt.MapFrom(s => s.Created));
        }
    }

    public class UserDatesDto: IMapFrom<UserDate>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string PhoneNumber { get; set; }
    }
}
