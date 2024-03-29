'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AutoPart extends Model {
    static associate(models) {
      AutoPart.belongsTo(models.PartType, {foreignKey: 'idPartType'});
    }
  }
  AutoPart.init({
    partModel: {
        type: DataTypes.STRING(25),
        allowNull: true,
        validate: {
            len: {
                args: [0,25],
                msg: "El modelo debe contener como maximo 25 caracteres"
            }
        },
    },
    serialNumber: {
        type: DataTypes.STRING(25),
        allowNull: true,
        validate: {
            len: {
                args: [0,25],
                msg: "El serial debe contener como maximo 25 caracteres"
            }
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg:"El stock solo debe contener numeros" },
        },
    },
    drawer: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            len: {
                args: [1,10],
                msg: "El numero de cajon debe contener como maximo 10 caracteres"
            }
        },
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: {
            len: {
                args: [0,200],
                msg: "La descripcion puede tener como maximo 200 caracteres"
            }
        },
    },
    image: {
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: {
            len: {
                args: [0,200],
                msg: "La imagen debe contener como maximo 200 caracteres"
            }
        },
    },


// Foreign Keys que no son FK pq son nulas

    idCarBrand: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idPartBrand: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idPartType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'AutoPart',
  });
  return AutoPart;
};