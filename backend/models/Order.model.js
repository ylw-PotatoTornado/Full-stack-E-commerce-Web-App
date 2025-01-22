import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export function OrderModel(sequelize) {
    return sequelize.define(
        'OrderModel',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(),
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            address_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            order_status: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            total_price: {
                type: DataTypes.DECIMAL(10,2),
                allowNull:false,
            }
        },{
            tableName: 'orders',
            timestamps: true,
        }
    )
}