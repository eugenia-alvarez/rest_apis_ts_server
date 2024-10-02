import {Table, Column, Model, DataType, Default} from "sequelize-typescript"  //son decoradores

@Table({
    tableName:"products"
})

class Product extends Model{

    //En el modelo debemos definir los atributos que va a tener el producto
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean

}

export default Product