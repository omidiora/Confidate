using Confidate.Domain.Entities;
using Confidate.Domain.Enums;
using Confidate.Domain.ValueObjects;
using Confidate.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Confidate.Infrastructure.Persistence
{
  public static class ApplicationDbContextSeed
  {
    public static async Task SeedDefaultUserAsync(ApplicationDbContext context, PasswordHasher hasher)
    {
      //if (!context.Users.Any())
      //{
      //    var salt = Guid.NewGuid().ToByteArray();

      //    context.Users.Add(new User
      //    {
      //        Email = "admin@email.com",
      //        Name = "Admin",
      //        Status = "ACTIVE",
      //        Roles =
      //        {
      //            new UserRole { Role = Role.Admin },
      //        },
      //        Hash = null,//hasher.Hash("admin", salt),
      //        Salt = salt
      //    });

      //    await context.SaveChangesAsync();
      //}
      await Task.CompletedTask;
    }

    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {
      // Seed, if necessary
      //if (!context.TodoLists.Any())
      //{
      //context.TodoLists.Add(new TodoList
      //{
      //    Title = "Shopping",
      //    Colour = Colour.Blue,
      //    Items =
      //    {
      //        new TodoItem { Title = "Apples", Done = true },
      //        new TodoItem { Title = "Milk", Done = true },
      //        new TodoItem { Title = "Bread", Done = true },
      //        new TodoItem { Title = "Toilet paper" },
      //        new TodoItem { Title = "Pasta" },
      //        new TodoItem { Title = "Tissues" },
      //        new TodoItem { Title = "Tuna" },
      //        new TodoItem { Title = "Water" }
      //    }
      //});

      // await context.SaveChangesAsync();
      // }

      await Task.CompletedTask;
    }
  }
}
