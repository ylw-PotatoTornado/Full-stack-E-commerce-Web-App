import {DataTypes} from 'sequelize';


export function CartProductModel(sequelize) {
    return sequelize.define(
        'CartProductModel',
        {
            cart_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },{
            tableName: 'cart_products',
            timestamps: true,
        }
    )
}