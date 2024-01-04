using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Confidate.Infrastructure.Persistence.Migrations
{
    public partial class SeperateMedia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string[]>(
                name: "Photos",
                table: "Chats",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string[]>(
                name: "Videos",
                table: "Chats",
                type: "text[]",
                nullable: true);

            migrationBuilder.Sql("update \"Chats\" set \"Photos\" =  \"Media\"");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photos",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "Videos",
                table: "Chats");
        }
    }
}
