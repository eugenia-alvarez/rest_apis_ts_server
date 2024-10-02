import {Router} from "express"
import {body, param} from "express-validator"
import { createProduct, getProducts, getProductById, updateProduct, updateAvaliability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router() //tenemos acceso a todas las funciones del router de express

/**
 * @swagger
 * components: 
 *     schemas:
 *         Product:
 *             type: object
 *             properties: 
 *                 id:
 *                     type: integer
 *                     description: The Product ID
 *                     example: 1
 *                 name:
 *                     type: string
 *                     description: The Product name
 *                     example: Monitor Curvo de 35 Pulgadas
 *                 price:
 *                     type: number
 *                     description: The Product price
 *                     example: 300
 *                 availability:
 *                     type: boolean
 *                     description: The Product availability
 *                     example: true
 */



/**
 * @swagger
 * /products:
 *     get: 
 *         summary: Get a List of products  
 *         tags: 
 *             - Products
 *         description: Return a List of products
 *         responses: 
 *             200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: "#/components/schemas/Product"
 */

//Obtener Producto
router.get("/", getProducts)



/**
 * @swagger
 * /products/{id}:
 *     get: 
 *         summary: Get a Product By ID 
 *         tags: 
 *             - Products
 *         description: Return a Product based on its unique ID
 *         parameters:
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                 type: integer
 *         responses:
 *             200:
 *                 description: Successful Response
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             $ref: "#/components/schemas/Product"
 *             404:
 *                 description: Not Found
 *             400:
 *                 description: Bad Request - Invalid ID
 */

//obtener Producto By ID
router.get("/:id", 

    //si el id que se selecciono, NO es un numero, va a mostrar el msj de "Valor no válido"
    param("id").isInt().withMessage("Valor no válido. El ID debe ser un número"),

    handleInputErrors, //reutilizamos el middleware que creamos
    
    getProductById )


/**
 * @swagger
 * /products:
 *     post: 
 *         summary: Creates a new Product
 *         tags: 
 *             - Products
 *         description: Return a new record in the database
 *         requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor Curvo 49 Pulgadas"
 *                            price:
 *                                 type: number
 *                                 example: 300
 *         responses:
 *             201:
 *                 description: Successfull response
 *                 content:
 *                     application/json:
 *                             schema:
 *                                 $ref: "#/components/schemas/Product"
 *             400:
 *                 description: Bad Request - Invalid input data
 */

//Crear Producto
router.post("/", 
    //Validación 
    //notEmpty revisa que no esté vacío 
    body("name").notEmpty().withMessage("El nombre del Producto no puede ir vacío"),
    
    body("price")
    .isNumeric().withMessage("Valor no válido. Se espera un número")
    .notEmpty().withMessage("El precio del Producto no puede ir vacío")
    .custom(value => value > 0).withMessage("El precio debe ser mayor que cero"), //podemos crear validaciones personalizadas    
    //No validamos si esta disponible o no, porque ese campo por default tiene el valor de true

      //MiddleWare
      handleInputErrors, //son funciones intermedias que se ejecutan en cada request de tipo http

      createProduct
)



/**
 * @swagger
 * /products/{id}:
 *     put: 
 *         summary: Updates a Product with user input
 *         tags: 
 *             - Products
 *         description: Returns the updated product
 *         parameters: 
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                 type: integer
 *         requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor Curvo 49 Pulgadas"
 *                            price:
 *                                 type: number
 *                                 example: 300
 *                            availability:
 *                                 type: boolean
 *                                 example: true
 *         responses:
 *             200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: "#/components/schemas/Product"
 *             400:
 *                 description: Bad Request - Invalid ID or Invalid input data
 *             404:
 *                 description: Product Not Found
 */
 
router.put("/:id",

     //Validación 
    //notEmpty revisa que no esté vacío 
    param("id").isInt().withMessage("Valor no válido. El ID debe ser un número"),
    body("name").notEmpty().withMessage("El nombre del Producto no puede ir vacío"),
    
    body("price")
    .isNumeric().withMessage("Valor no válido. Se espera un número")
    .notEmpty().withMessage("El precio del Producto no puede ir vacío")
    .custom(value => value > 0).withMessage("El precio debe ser mayor que cero"),

    body("availability").isBoolean().withMessage("Valor no Válido"),
    
    handleInputErrors, //midleware

    updateProduct
)

/**
 * @swagger
 * /products/{id}:
 *     patch: 
 *         summary: Update Product availability
 *         tags: 
 *             - Products
 *         description: Returns the updated product
 *         parameters: 
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                 type: integer
 *         responses:
 *             200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: "#/components/schemas/Product"
 *             400:
 *                 description: Bad Request - Invalid ID 
 *             404:
 *                 description: Product Not Found
 */

router.patch("/:id", 
    param("id").isInt().withMessage("Valor no válido. El ID debe ser un número"),
    handleInputErrors,
    updateAvaliability    
)


/**
 * @swagger
 * /products/{id}:
 *     delete: 
 *         summary: Deletes a Product by given ID
 *         tags: 
 *             - Products
 *         description: Returns a confirmation message
 *         parameters: 
 *           - in: path
 *             name: id
 *             description: The ID of the product to delete
 *             required: true
 *             schema:
 *                 type: integer
 *         responses:
 *             200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: string
 *                             value: "Producto Eliminado"
 *             400:
 *                 description: Bad Request - Invalid ID 
 *             404:
 *                 description: Product Not Found
 */

router.delete("/:id", 
    param("id").isInt().withMessage("Valor no válido. El ID debe ser un número"),
    handleInputErrors,
    deleteProduct)

export default router