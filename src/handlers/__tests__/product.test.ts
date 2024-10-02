import request from "supertest";
import server from "../../server";

describe("POST /products", () => {

    test("should display validation errors", async() => {

        //el send lo mandamos vacio, porque estamos simulando que mandamos el objeto vacío
        const response = await request(server).post("/products").send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")

        //si mandamos el objeto vacio, debemos tener 4 mensajes de erorr
        expect(response.body.error).toHaveLength(4)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty("data")
    }),

    test("should validate that the price is greater than 0", async() => {

        const response = await request(server).post("/products").send({
            name: "Monitor Curvo - Testing",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")

        //si mandamos 0 como precio, vamos a tener unicamente un mensaje de error
        expect(response.body.error).toHaveLength(1)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty("data")
    }),

    test("should validate that the price is a number and greater than 0", async() => {

        const response = await request(server).post("/products").send({
            name: "Monitor Curvo - Testing",
            price: "Hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")

        //si mandamos 0 como precio, vamos a tener unicamente un mensaje de error
        expect(response.body.error).toHaveLength(2)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty("data")
    }),

    test("should crreate a new product", async() => {
        const response = await request(server).post("/products").send({
            name: "Monitor -Testing",
            price: 50
          })

        //.send() es lo que vas a enviarle. Que informacion quieres pasar hacia ese endpoint
        //Si recordamos al Post debemos pasarle el nombre y el precio

        //Lo que se SI se debe cumplir
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data") //como estamos creando un objeto, verificamos que tenga la propieda de data
   
        //Lo que NO se debe cumplir
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("error")

    })
})

describe("GET /products", () => {

    test("should check if /products url exists", async() => { //verificamos que la ruta exista
        const response = await request(server).get("/products")
        expect(response.status).not.toBe(404)

    })

    test("GET a JSON response with products", async() => {
        const response = await request(server).get("/products")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.headers["content-type"]).toMatch(/json/) //si la peticion es correcta, obtenemos datos de tipo json

        expect(response.body).not.toHaveProperty("error")
    })

})

describe("GET /products/:id", () => {

    test("Should return a 404 response for a non-existent product", async() => {
        const id = -1
        const response = await request(server).get(`/products/${id}`)
        expect(response.body).toHaveProperty("error")
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")
    })

    test("should check a valid ID in the URL", async() => {
        const response = await request(server).get("/products/not-valid-url")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error[0].msg).toBe("Valor no válido. El ID debe ser un número")
        expect(response.body.error).toHaveLength(1)
    })

    test("GET a JSON response for a single Product", async() => {
        const id = 1
        const response = await request(server).get(`/products/${id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("error")
    })
})

describe("PUT /products/:id", () => {

    //cuano mandamos un id no valido
    test("should check a valid ID in the URL", async() => {
        const response = await request(server).put("/products/not-valid-url").send({
            name: "Monitor Curvo Actualizado",
            availability: true,
            price: 200
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error[0].msg).toBe("Valor no válido. El ID debe ser un número")
    })


    //cuando mandamos el producto vacio
    test("should display validation error message when updating a product", async() => {
        const id = 1
        const response = await request(server).put(`/products/${id}`).send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toHaveLength(5)
        expect(response.body.error).toBeTruthy() //lo utilizas cuando no te interesa lo que contiene, sino que te interesa si contiene algo o no 

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    //cuando el precio no es un numero valido
    test("should validate that the price is greater than 0", async() => {
        const response = await request(server).put("/products/1").send({
            name: "Monitor Curvo",
            availability: true,
            price: -300
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toHaveLength(1)
        expect(response.body.error[0].msg).toBe("El precio debe ser mayor que cero")
   
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })


    //cuando el producto no existe
    test("should return a 404 response for a non-existent product", async() => {
        const id = 3000
        const response = await request(server).put(`/products/${id}`).send({
            name:"Monitor Curvo - Actualizado",
            availability: true,
            price: 300
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
        
})

    //cuando mandamos los datos correctos
    test("should update an existing product with valid data ", async() => {
        const id = 1
        const response = await request(server).put(`/products/${id}`).send({
            name:"Monitor Curvo - Actualizado",
            availability: true,
            price: 300
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")

        expect(response.body).not.toHaveProperty("error")
        
})

})

describe("PATCH /products/:id", () => {

     //Url no valida
    test("should check a valid ID", async() => {
        const response = await request(server).patch("/products/not-valid-ur")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error[0].msg).toBe("Valor no válido. El ID debe ser un número")
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")

    })

    //Producto no encontrado - Id no existente
    test("should return a 404 response for a non-existing product", async() => {
        const id = 10000
        const response = await request(server).patch(`/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })


    //Id valido
    test("should update the product avaliability", async() => {
        const id = 1
        const response = await request(server).patch(`/products/${id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("error")
    })
})



describe("DELETE /products/:id", () => {

    test("should check a valid ID", async() =>{
        const response = await request(server).delete("/products/not-valid-url")
        expect(response.status).toBe(400)
        expect(response.body.error[0].msg).toBe("Valor no válido. El ID debe ser un número")
        expect(response.body).toHaveProperty("error")

        expect(response.status).not.toBe(200)
        expect(response.body.data).not.toBe("Producto eliminado")
    })


    test("should return a 404 response for a non-existent product", async() => {
        const id = 3000
        const response = await request(server).delete(`/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body.data).not.toBe("Producto eliminado")

    })

    test("should delete a product ", async() => {
        const id = 1
        const response = await request(server).delete(`/products/${id}`)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Producto eliminado")

        expect(response.status).not.toBe(404)
        expect(response.body.error).not.toBe("Producto no encontrado")

    })
})