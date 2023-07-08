const jwt = require('jwt-simple')
const moment = require('moment')
const { Log } = require('../database/models/index')

const getId = (req) => {
  const userToken = req.headers['user-token']
  const payload = jwt.decode(userToken, process.env.SECRET_KEY)
  console.log(payload.userId)
  return payload.userId
}

const createToken = (u) => {
  const payload = {
    userId: u.id,
    email: u.email,
    createdAt: moment().unix(),
    expiredAt: moment().add(1, 'hour').unix()
  }
  return jwt.encode(payload, process.env.SECRET_KEY)
}

const saveLog = (Model, type, idUser, idModel) => {
  Log.create({
    type: type,
    modelName: Model.name,
    idModel,
    idUser
  })

  console.log('Log saved')
}

module.exports = {
  getId,
  createToken,
  saveLog
}
