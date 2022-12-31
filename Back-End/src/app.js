const app = require('./server');
const http = require('http').createServer(app);
const {sequelize} = require('./database/models/index');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Running on a port: ${PORT}`);
    sequelize.sync({ force: process.env.FORCE || false }).then(() => { // Si pongo el force en true se crean las tablas de nuevo
        console.log('Database connected -> Force: ' + process.env.FORCE); 
    }).catch((err) => {
        console.log('Database error', err);
    })
})

