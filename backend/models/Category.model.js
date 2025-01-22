import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export function CategoryModel(sequelize) {
    return sequelize.define(
        'CategoryModel',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(),
            },
            category_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,                
            },
            category_description: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },                
            url_slug: {
                type: DataTypes.STRING(20),
                allowNull: false,

            },
        },{
            tableName: 'categories',
            timestamps: true,
        }
    )
}