import {DataTypes} from 'sequelize'
import TableName from '../utils/TableName.js'
import DateTime from '../utils/Date.js'
import {sequelize} from '../configs/database.js'

const CompanySchema = sequelize.define(TableName.TABLE_COMPANY, {
    ID : {
        type: DataTypes.STRING(20),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: TableName.COLUM_ID_COMPANY
    },

    CREATED_BY_MANAGER: {
        type: DataTypes.STRING(20),
        field: TableName.COLUM_ID_MANAGER_COMPANY,
        references: {
            model: TableName.TABLE_MANAGER,
            key: TableName.COLUM_ID_MANAGER
        },
        defaultValue: 'a36d8cec-0793-404c-b'
    },

    COMPANY_NAME: {
        type: DataTypes.STRING(25),
        allowNull: false,
        field: TableName.COLUM_COMPANY_NAME,
        unique: true
    },

    COUNTRIES: {
        type: DataTypes.STRING(25),
        allowNull: false,
        field: TableName.COLUM_COUNTRIES_COMPANY,
        unique: true
    },

    IMAGE: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: TableName.COLUM_IMAGE_COMPANY
    },

    CREATED_AT: {
        type: DataTypes.STRING, 
        defaultValue: DateTime.getTimeNow().toString(),
        field: TableName.COLUM_CREATED_AT_COMPANY
    },

    UPDATED_AT: {
        type: DataTypes.STRING(25), 
        defaultValue: DateTime.getTimeNow().toString(),
        field: TableName.COLUM_UPDATED_AT_COMPANY
    }
}, {
    timestamps: false
})

export default CompanySchema