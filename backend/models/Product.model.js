import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export function ProductModel(sequelize) {
    return sequelize.define(
        'ProductModel',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(),
            },
            product_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,                
            },
            unit_price: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
            },
            unit: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },                
            short_desc: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            long_desc: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image_url: {
                type: DataTypes.TEXT,
                allowNull: false,                
            }
        },{
            tableName: 'products',
            timestamps: true,
        }
    )
}