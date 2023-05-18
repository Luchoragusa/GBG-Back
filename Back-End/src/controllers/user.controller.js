const { User } = require('../database/models/index')
const bcrypt = require('bcrypt')
const { createToken } = require('../utilities/util')

const register = async (req, res) => {
  const userNew = req.body
  try {
    // Valido que el mail no exista en la DB
    await User.findOne({ where: { email: userNew.email } })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'El email ya existe' })
        }
      })

    await User.create(userNew).then((user) => {
      return res.status(201).json({ message: 'Usuario creado', user })
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    await User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = createToken(user)
            res.cookie('jwt', token, { httpOnly: true, secure: true })
            return res.status(200).json({ msg: { token, user } })
          } else {
            return res.status(404).json({ message: 'Usuario y/o contraseña incorrecto' })
          }
        }
      })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// const logOut = async (req, res, next) => {
//   //Eliminar cookie jwt
//   res.clearCookie('jwt')
//   //Redirigir a la vista de login
//   return res.redirect('/login')
// };

module.exports = {
  register,
  login
}
