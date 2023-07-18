const bcrypt = require('bcrypt')

const user = {  
  name: 'test',
  surname: 'test',
  password: 'test123',
  email: 'test@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date()
}

module.exports = {
  user
};