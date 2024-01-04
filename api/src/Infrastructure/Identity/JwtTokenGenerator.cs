using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Confidate.Application.Common.Interfaces;
using Microsoft.Extensions.Options;

namespace Confidate.Infrastructure.Identity
{
  public class JwtTokenGenerator : IJwtTokenGenerator
  {
    private readonly JwtIssuerOptions _jwtOptions;

    public JwtTokenGenerator(IOptions<JwtIssuerOptions> jwtOptions)
    {
      _jwtOptions = jwtOptions.Value;
    }

    public async Task<string> CreateToken(string sub, string[] roles)
    {
      var claims = new[]
      {
                new Claim(JwtRegisteredClaimNames.Sub, sub),
                new Claim("roles",string.Join(":", roles)),
                new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat,
                    new DateTimeOffset(_jwtOptions.IssuedAt).ToUnixTimeSeconds().ToString(),
                    ClaimValueTypes.Integer64)
            };

      var jwt = new JwtSecurityToken(
          _jwtOptions.Issuer,
          _jwtOptions.Audience,
          claims,
          _jwtOptions.NotBefore,
          _jwtOptions.Expiration,
          _jwtOptions.SigningCredentials);

      var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
      return encodedJwt;
    }
  }
}
