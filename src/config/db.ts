import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"
dotenv.config() //llamamos a las variables de entorno



const db = new Sequelize(process.env.DATABASE_URL!,{
    
    models: [__dirname + "/../models/**/*"], //le decimos en q directorio va a encontrar los modelos para generar las columnas
    logging: false //para q no marque error cuando ejecutamos los test
}) //Con ! le garantizamos que el valor va a estar ahi

export default db