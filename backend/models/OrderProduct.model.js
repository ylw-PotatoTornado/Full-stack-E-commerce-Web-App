import {DataTypes} from 'sequelize';


export function OrderProductModel(sequelize) {
    return sequelize.define(
        'OrderProductModel',
        {
            order_id: {
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
            tableName: 'order_products',
            timestamps: true,
        }
    )
}