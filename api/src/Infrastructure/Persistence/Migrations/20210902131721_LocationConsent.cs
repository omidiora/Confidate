using Microsoft.EntityFrameworkCore.Migrations;

namespace Confidate.Infrastructure.Persistence.Migrations
{
    public partial class LocationConsent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllowLocationTracking",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowLocationTracking",
                table: "Users");
        }
    }
}
