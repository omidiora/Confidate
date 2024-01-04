using Confidate.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Infrastructure.Identity
{
  public class PasswordHasher : IPasswordHasher
  {
    private readonly HMACSHA512 x = new(Encoding.UTF8.GetBytes("jaibalayya"));

    public byte[] Hash(string password, byte[] salt)
    {
      var bytes = Encoding.UTF8.GetBytes(password);

      var allBytes = new byte[bytes.Length + salt.Length];
      Buffer.BlockCopy(bytes, 0, allBytes, 0, bytes.Length);
      Buffer.BlockCopy(salt, 0, allBytes, bytes.Length, salt.Length);

      return x.ComputeHash(allBytes);
    }
  }
}
