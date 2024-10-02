//Siempre que trabajamos con Middleware, debemos tener el request, el response y next
import {Request, Response, NextFunction} from "express"
import { validationResult} from "express-validator"


export const handleInputErrors = (req : Request, res : Response, next : NextFunction) => {

    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }

       
    console.log("Desde middleware")

    next() //se refiere a que ya termino aqui, tiene que pasar a la siguiente funcion
}

