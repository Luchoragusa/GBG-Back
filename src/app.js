const app = require('./server');
const http = require('http').createServer(app);
const {sequelize} = require('./database/models/index');
const { user } = require('./database/seeders/userSeed');
const { User } = require('./database/models/index');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Running on a port: ${PORT}`);
    sequelize.sync({ alter: true }).then(() => { // Si pongo el force en true se crean las tablas de nuevo
        console.log('Database connected'); 
    })
    
    // .then (() => {
    //     console.log(user)
    //     User.create(user)
    // })

    .catch((err) => {
        console.log('Database error', err);
    })
})
