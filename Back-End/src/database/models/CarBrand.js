'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CarBrand extends Model {
        static associate(models) {
            CarBrand.hasMany(models.AutoPart, {foreignKey: 'idCarBrand'});
        }
    }
    CarBrand.init({
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
            len: {
                args: [3,20],
                msg: "El nombre debe contener entre 3 a 20 letras"
            }
            },
        }
    }, {
        sequelize,
        modelName: 'CarBrand',
    });
    return CarBrand;
};