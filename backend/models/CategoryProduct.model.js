import {DataTypes} from 'sequelize';


export function CategoryProductModel(sequelize) {
    return sequelize.define(
        'CategoryProductModel',
        {
            category_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
        },{
            tableName: 'category_products',
            timestamps: true,
        }
    )
}