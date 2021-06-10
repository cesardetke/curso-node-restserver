const mongoose = require('mongoose');


const dbcnn = async () => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log( 'Conexión a BD establecida' );
        
    } catch (error) {
        console.error(error);
        throw new Error('Ocurrió un error al intentar establecer la conexión con la BD')
    }

}

module.exports = {
    dbcnn
}