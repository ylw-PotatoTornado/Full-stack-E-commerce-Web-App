import {DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import { UsaStates } from "usa-states"

const usaStates = new UsaStates();
const stateAbbreviations = usaStates.states.map((state) => state.abbreviation);


export function AddressModel(sequelize) {
    return sequelize.define(
        'AddressModel',
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
            address_line1: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            address_line2: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    isIn: [stateAbbreviations],
                }
            },
            zipcode: {
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    is: /^[0-9]{5}(-[0-9]{4})?$/,
                },
            },
        },{
            tableName: 'addresses',
            timestamps: true,
        }
    )
}