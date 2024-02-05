"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProblemVersions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seriesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Series",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      problemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Problems",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      canvasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Setters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      title: {
        type: Sequelize.STRING,
      },
      statement: {
        type: Sequelize.TEXT,
      },
      serialNo: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isLive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      canvasData: {
        type: Sequelize.JSON,
      },
      editOptions: {
        type: Sequelize.JSON,
      },
      previewOptions: {
        type: Sequelize.JSON,
      },
      checkerCode: {
        type: Sequelize.TEXT,
      },
      checkerCanvas: {
        type: Sequelize.JSON,
      },
      approvalStatus: {
        type: Sequelize.INTEGER, // 0 - old (Approved), 1 - latest (Approved), 2 - Pending (At most 1), 3 - Rejected
        defaultValue: 2,
      },
      feedback: {
        type: Sequelize.TEXT,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 800,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION copy_problem_to_version()
      RETURNS TRIGGER AS $$
      DECLARE
        problem_row "Problems"%ROWTYPE;
        next_version integer;
      BEGIN
        SELECT INTO problem_row * FROM "Problems" WHERE id = NEW."problemId";
        SELECT INTO next_version COALESCE(MAX(version), 0) + 1 FROM "ProblemVersions" WHERE "problemId" = NEW."problemId";

        NEW."problemId" := problem_row.id;
        NEW."canvasId" := problem_row."canvasId";
        NEW.title := problem_row.title;
        NEW.statement := problem_row.statement;
        NEW."canvasData" := problem_row."canvasData";
        NEW."editOptions" := problem_row."editOptions";
        NEW."previewOptions" := problem_row."previewOptions";
        NEW."checkerCode" := problem_row."checkerCode";
        NEW."checkerCanvas" := problem_row."checkerCanvas";
        NEW.version := next_version;

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      CREATE TRIGGER copy_problem_trigger
      BEFORE INSERT ON "ProblemVersions"
      FOR EACH ROW
      EXECUTE FUNCTION copy_problem_to_version();
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS copy_problem_trigger ON "ProblemVersions";
      DROP FUNCTION IF EXISTS copy_problem_to_version();
    `);

    await queryInterface.dropTable("ProblemVersions");
  },
};
