'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PartBrand extends Model {
        static associate(models) {
            PartBrand.hasMany(models.AutoPart, {foreignKey: 'idPartBrand'});
        }
    }
    PartBrand.init({
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
            isAlpha: { msg:"El nombre solo debe contener letras" },
            len: {
                args: [3,20],
                msg: "El nombre debe contener entre 3 a 20 letras"
            }
            },
        }
    }, {
        sequelize,
        modelName: 'PartBrand',
    });
    return PartBrand;
};