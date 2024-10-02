import {Request, Response} from "express"
import Product from "../models/Product.model"


export const getProducts = async(req : Request, res : Response) => {

  //Para obtener datos debemos utilziar los metodos que comienzan con FIND
  const products = await Product.findAll({
    order: [
        ["id" , "DESC"]
    ]
  })
  res.json({data: products})

}

export const getProductById = async (req : Request, res : Response) => {
    const id = req.params.id
    const product = await Product.findByPk(id)


//Si el producto no existe, va a retornar el mensaje de "Producto no encontrado"
    if(!product){ //Si NO hay un producto
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    res.json({data: product})
}


export const createProduct = async(req : Request, res : Response) => {

    const product = new Product(req.body) //se crea un producto
        const savedProduct = await product.save() //se almacena en la base de datos
        res.status(201).json({data: savedProduct}) //se imprime el producto que agregamos a la base de datos

        /**
         const product = await Product.create(req.body)
         es.json({data: savedProduct})
         */
}


export const updateProduct = async(req : Request, res : Response) => {
           //Buscamos el producto y verificamos que exista
           const id = req.params.id
           const updateProduct = await Product.findByPk(id)
   
           if(!updateProduct){
               return res.status(404).json({
                   error: "Producto no encontrado"
               })
           }
   
           //Si el producto existe, Actualizamos el Producto
          await updateProduct.update(req.body) //lo actualiza
           await updateProduct.save() //lo almacena
   
           res.json({data: updateProduct})
}


export const updateAvaliability = async (req : Request, res : Response) => {

    //Buscamos el producto y verificamos que exista
    const id = req.params.id
    const updateProduct = await Product.findByPk(id)

    if(!updateProduct){
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    //Si el producto existe, Actualizamos la disponibilidad
    updateProduct.availability = !updateProduct.dataValues.availability //lo que hace esto, es q cuando lo mandemos a llamar, se actualiza con el valor contrario
    await updateProduct.save() //lo almacena
    res.json({data: updateProduct})
}

export const deleteProduct = async(req : Request, res : Response) => {
    //Buscamos el producto y verificamos que exista
    const id = req.params.id
    const deleteProduct = await Product.findByPk(id)

   if(!deleteProduct){
       return res.status(404).json({
           error: "Producto no encontrado"
       })
   }

   await deleteProduct.destroy()
   res.json({data: "Producto eliminado"})


}