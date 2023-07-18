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

  let log = {
    type: type,
    idUser: idUser,
    idAutoPart: null,
    idPartBrand: null,
    idPartType: null,
    idCarBrand: null
  }

  switch (Model.name) {
    case 'AutoPart':
      log.idAutoPart = idModel
      break
    case 'PartBrand':
      log.idPartBrand = idModel
      break
    case 'PartType':
      log.idPartType = idModel
      break
    case 'CarBrand':
      log.idCarBrand = idModel
      break
    default:
      break
  }

  Log.create( log )
}

module.exports = {
  getId,
  createToken,
  saveLog
}
