import { Sequelize, DataTypes, Model } from "sequelize";

module.exports = function (sequelize: Sequelize) {
  return sequelize.define(
    "user",
    {
      flights: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      company: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("arrived", "landed"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "flight",
    }
  );
};
