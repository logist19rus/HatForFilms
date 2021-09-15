using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class addMemberToHat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MemberId",
                table: "Hats",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hats_MemberId",
                table: "Hats",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hats_Users_MemberId",
                table: "Hats",
                column: "MemberId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hats_Users_MemberId",
                table: "Hats");

            migrationBuilder.DropIndex(
                name: "IX_Hats_MemberId",
                table: "Hats");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "Hats");
        }
    }
}
