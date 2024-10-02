/**describe nos sirve para agrupar una serie de pruebas
 que esten relacionadas
 */

 import request from "supertest" //nos permite enviar una peticion a determinado endpoint
 import server, {conectDB} from "../server"
 import db from "../config/db" //instancia de sequelize


 jest.mock("../config/db.ts") //el mock va a simular la coneccion a la base de datos

 describe("connectDB" , () => {
    test("shouldhandle database connection error", async() => {
      jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error al conectar a la BD"))
  
      const consoleSpy = jest.spyOn(console, "log") //leemos los posibles errores

      await conectDB() //mandamos a llamar la conexion a la bd

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Hubo un error al conectar a la BD")
      ) //esta funcion es para cuando trabajas con mock, te aseguras de q un mock haya sido llamado con ciertos argumentos 
    })

 })

 //le pasa la conexion, espera a que ocurra la autenticacion y nosotros con el mock lanzamos una excepcion (un error) para que se ejecute el codigo del catch  