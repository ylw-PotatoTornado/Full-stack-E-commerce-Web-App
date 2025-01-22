import {DataTypes} from 'sequelize';


export function RatingModel(sequelize) {
    return sequelize.define(
        'RatingModel',
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
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },            
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },{
            tableName: 'ratings',
            timestamps: true,
        }
    )
}