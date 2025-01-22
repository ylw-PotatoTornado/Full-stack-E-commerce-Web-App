import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export function InventoryModel(sequelize) {
    return sequelize.define(
        'InventoryModel',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(),
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            total_stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            available_stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },{
            tableName: 'carts',
            timestamps: true,
        }
    )
}