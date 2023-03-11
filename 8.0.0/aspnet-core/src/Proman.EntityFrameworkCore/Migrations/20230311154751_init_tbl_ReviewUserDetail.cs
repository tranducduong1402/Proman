using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proman.Migrations
{
    /// <inheritdoc />
    public partial class inittblReviewUserDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReviewUserDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReviewUserId = table.Column<long>(type: "bigint", nullable: true),
                    Point = table.Column<float>(type: "real", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    UserType = table.Column<int>(type: "int", nullable: false),
                    UserLevel = table.Column<byte>(type: "tinyint", nullable: false),
                    PositionId = table.Column<long>(type: "bigint", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewUserDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReviewUserDetails_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReviewUserDetails_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ReviewUserDetails_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ReviewUserDetails_ReviewUsers_ReviewUserId",
                        column: x => x.ReviewUserId,
                        principalTable: "ReviewUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewUserDetails_PositionId",
                table: "ReviewUserDetails",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewUserDetails_ProjectId",
                table: "ReviewUserDetails",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewUserDetails_ReviewUserId",
                table: "ReviewUserDetails",
                column: "ReviewUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewUserDetails_UserId",
                table: "ReviewUserDetails",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReviewUserDetails");
        }
    }
}
