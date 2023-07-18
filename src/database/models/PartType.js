'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PartType extends Model {
        static associate(models) {
            PartType.hasMany(models.AutoPart, {foreignKey: 'idPartType'});
        }
    }
    PartType.init({
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
            len: {
                args: [2,20],
                msg: "El tipo debe contener entre 2 a 20 letras"
            }
            },
        }
    }, {
        sequelize,
        modelName: 'PartType',
    });
    return PartType;
};