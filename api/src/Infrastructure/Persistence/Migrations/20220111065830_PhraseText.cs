using Microsoft.EntityFrameworkCore.Migrations;

namespace Confidate.Infrastructure.Persistence.Migrations
{
    public partial class PhraseText : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhraseLink",
                table: "EmergencyPhrases",
                newName: "PhraseText");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhraseText",
                table: "EmergencyPhrases",
                newName: "PhraseLink");
        }
    }
}
