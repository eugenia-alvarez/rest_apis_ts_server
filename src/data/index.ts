import {exit} from "node:process"
import db from "../config/db" //requerimos la instancia de sequelize

const clearDB = async() => {

    try{
        await db.sync({force: true}) //elimina todos los datos de la base de datos
        console.log("Datos eliminados correctamente")
        exit() //finaliza correctamente
    }    
    catch(error){
        console.log(error)
        exit(1) //significa que finaliza con errores
    }

}

if(process.argv[2] === "--clear"){
    clearDB()
}