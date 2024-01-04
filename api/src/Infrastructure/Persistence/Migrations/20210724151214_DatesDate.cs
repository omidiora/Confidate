using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Confidate.Infrastructure.Persistence.Migrations
{
    public partial class DatesDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromDate",
                table: "UserDates");

            migrationBuilder.DropColumn(
                name: "ToDate",
                table: "UserDates");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateFrom",
                table: "UserDates",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTo",
                table: "UserDates",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateFrom",
                table: "UserDates");

            migrationBuilder.DropColumn(
                name: "DateTo",
                table: "UserDates");

            migrationBuilder.AddColumn<string>(
                name: "FromDate",
                table: "UserDates",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToDate",
                table: "UserDates",
                type: "text",
                nullable: true);
        }
    }
}
