'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        static associate(models) {
            // Relacion con User - La tabla Log tiene una FK de User llamada idUser
            Log.belongsTo(models.User, { foreignKey: 'idUser'})

            // Relacion con AutoPart - La tabla Log tiene una FK de AutoPart llamada idAutoPart
            Log.belongsTo(models.AutoPart, { foreignKey: 'idAutoPart'})
            // Relacion con PartBrand - La tabla Log tiene una FK de PartBrand llamada idPartBrand
            Log.belongsTo(models.PartBrand, { foreignKey: 'idPartBrand'})
            // Realacion con PartType - La tabla Log tiene una FK de PartType llamada idPartType
            Log.belongsTo(models.PartType, { foreignKey: 'idPartType'})
            // Realacion con CarBrand - La tabla Log tiene una FK de CarBrand llamada idCarBrand
            Log.belongsTo(models.CarBrand, { foreignKey: 'idCarBrand'})
        }
    }
    Log.init({
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: 'El tipo es requerido' },
        }
    }
    }, {
        sequelize,
        modelName: 'Log',
    });
    return Log;
};