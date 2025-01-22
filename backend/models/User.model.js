import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export function UserModel(sequelize) {
    return sequelize.define(
        'UserModel',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(),
            },
            email_address: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            hashed_pw: {
                type: DataTypes.CHAR(60),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            auth_method: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'local',
            },
        },{
            tableName: 'users',
            timestamps: true,
        }
    )
}