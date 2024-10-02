import server from "./server";
import colors from "colors"

const port = process.env.PORT || 3000 //Cuando hacemos el deploy, el puerto lo asigna el servidor. Caso q no lo asigne, va a ser el puerto 4000

server.listen(port, () => {
    console.log(colors.bgMagenta(`REST API en el puerto ${port}`))
})