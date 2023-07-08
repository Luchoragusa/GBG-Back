'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        static associate(models) {
            // Relacion con User - La tabla Log tiene una FK de User llamada idUser
            Log.belongsTo(models.User, { foreignKey: 'idUser'})
        }
    }
    Log.init({
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: 'El tipo es requerido' },
        }
    },
      idModel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: 'El idModel es requerido' },
        }
    },
        modelName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: { msg: 'El modelName es requerido' },
            }
        },
    }, {
        sequelize,
        modelName: 'Log',
    });

    return Log;
};