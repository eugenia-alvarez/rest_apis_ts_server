import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            //es un objeto por ruta
            {
                name:"Products",//pq es una api de productos
                description: "API operations related to products" //Operaciones de la api relacionadas a productos

            },

            //si tuvieramos otra ruta, creamos otro objeto. por ej:
            /**
             {
                    name:"Users",
                    description: "API operations related to products"
             }
             */
        ],
        info:{
            title: "REST API Node.js / Express / TypeScript ",
            version: "1.0.0",
            description:"API Docs for Products"
        }
    },
    apis:["./src/routes.ts"] //especificamos donde va a encontrar los endpoints que vas a querer documentar
//Podemos pasar un arreglo si tenemos diferentes rutas. En este caso solo tenemos la ruta de products. Pero podriamos tener ruta de usuarios, de diferentes cosas
//Si tuvieramos mas rutas solo ponemos una coma dentro del arreglo, y entre comilla el nombre del otro archivo, y asi sucesivamente

}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
  /*  customCss: `
    .topbar-wrapper .link {
        content: url("https://static.vecteezy.com/system/resources/previews/000/601/874/original/vector-digital-print-logo-design.jpg");
        height: 120px;
        width: auto;
    }
    .swagger-ui .topbar {
        background-color: red
    }
    `,*/
    customSiteTitle: "Documentación REST API Express / TypeScript"
}

export default swaggerSpec
export {
    swaggerUiOptions
}