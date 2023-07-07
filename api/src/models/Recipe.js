const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    step_by_step: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
};
