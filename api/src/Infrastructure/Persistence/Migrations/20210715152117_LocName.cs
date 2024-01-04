using Microsoft.EntityFrameworkCore.Migrations;

namespace Confidate.Infrastructure.Persistence.Migrations
{
    public partial class LocName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserPoints",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserPoints");
        }
    }
}
