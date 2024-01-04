# Confidate

### Api Project

- .NET Core 5
- Entity Framework Core 5
- MediatR
- AutoMapper
- FluentValidation

---

### Commands

- cleanup:
  `dotnet clean`

- restore:
  `dotnet restore`

- build:
  `dotnet build`

- run:
  `dotnet watch --project src\WebAPI run`

- publish:
  `dotnet publish -c Release -r win-x64 --self-contained=true -o build src\WebApi`

---

### Database Migrations

make sure dotnet-ef is installed globally
`dotnet tool install --global dotnet-ef`

To use dotnet-ef for your migrations please add the following flags to your command (values assume you are executing from repository root)

- project src/Infrastructure (optional if in this folder)
- startup-project src/WebAPI
- output-dir Persistence/Migrations

For example, to add a new migration from the root folder:

`dotnet ef migrations add "SampleMigration" --project src\Infrastructure --startup-project src\WebApi --output-dir Persistence\Migrations`

`dotnet ef --project src\Infrastructure --startup-project src\WebApi database update`
