'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }
    User.init({
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: { msg: 'Nombre requerido' },
          isAlpha: { msg: 'El nombre solo debe contener letras' },
          len: {
            args: [3, 50],
            msg: 'El nombre debe contener entre 3 a 50 letras'
          }
        }
      },
      surname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: { msg: 'Apellido requerido' },
          isAlpha: { msg: 'El apellido solo debe contener letras' },
          len: {
            args: [3, 50],
            msg: 'El apellido debe contener entre 3 a 50 letras'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email requerido' },
          isEmail: { msg: 'Formato de email invalido' },
          len: {
            args: [5, 100],
            msg: 'El correo puede contener hasta 100 caracteres maximo'
          }
        }
      },
    }, {
        sequelize,
        modelName: 'User',
    });

    User.addHook('beforeCreate', (user) => {
      user.password = bcrypt.hashSync(user.password, 10)
    })

    return User;
};