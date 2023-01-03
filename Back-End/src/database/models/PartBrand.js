'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PartBrand extends Model {
        static associate(models) {
        }
    }
    PartBrand.init({
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
            len: {
                args: [0,20],
                msg: "El nombre debe contener como maximo 20 letras"
            }
            },
        }
    }, {
        sequelize,
        modelName: 'PartBrand',
    });
    return PartBrand;
};
