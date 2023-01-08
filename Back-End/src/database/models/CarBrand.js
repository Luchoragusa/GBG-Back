'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CarBrand extends Model {
        static associate(models) {
        }
    }
    CarBrand.init({
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
            len: {
                args: [2,20],
                msg: "El nombre debe contener entre 2 a 20 letras"
            }
            },
        }
    }, {
        sequelize,
        modelName: 'CarBrand',
    });
    return CarBrand;
};