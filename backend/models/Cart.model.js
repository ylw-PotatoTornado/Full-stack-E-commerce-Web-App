import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export function CartModel(sequelize) {
    return sequelize.define(
        'CartModel',
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
        },{
            tableName: 'carts',
            timestamps: true,
        },
        {
            defaultScope: {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }
        }
    )
}