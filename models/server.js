const express = require('express');
const cors = require('cors');
const { dbcnn } = require('../db/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.connectDB();
        
        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbcnn();
    }

    middlewares(){
        // Directorio Publico
        this.app.use(express.static('public'));
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
    this.app.listen(this.port, () => {
        console.log('Aplicación corriendo en el puerto', this.port)
    });
    }

}

module.exports = Server;