import express from "express";
import colors from "colors"
import cors, {CorsOptions} from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import router from "./routes";
import db from "./config/db";


//Conectar a base de datos
export async function conectDB() {

    try{
        await db.authenticate()
        db.sync() //en caso de que creemos nuevos modelos, nuevas columnas en la bd, las agrega
        //console.log(colors.bgGreen.bold("Conexión exitosa a la BD"))
    } catch(error){
        console.log(error)
        console.log(colors.bgRed.yellow("Hubo un error al conectar a la BD"))
    }
}

conectDB()

//Instancia de Express
const server = express()

//Permitir conexiones - CORS
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }
        else{
            callback(new Error("Error de Corse"))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json()) //esto es un middleware

server.use(morgan("dev"))

server.use("/products", router) //esto tambien es un middleware

//DOCS
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server