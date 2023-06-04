const Router = require('express')
const router = Router()
const { register, login, getOne } = require('../../controllers/user.controller')
const { validateToken } = require('../../utilities/middleware')

router.get('/', validateToken, (req, res) => {
  res.status(200).json({ message: 'Hola' })
})

//  Especificas
router.post('/register', register) // Registrar un usuario en la DB
router.post('/login', login) // crea uno
router.get('/:id', validateToken, getOne) // obtiene uno

module.exports = router
