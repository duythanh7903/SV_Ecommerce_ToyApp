import {DataTypes} from 'sequelize'
import TableName from '../utils/TableName.js'
import DateTime from '../utils/Date.js'
import {sequelize} from '../configs/database.js'

const CategorySchema = sequelize.define(TableName.TABLE_CATEGORY, {
    ID : {
        type: DataTypes.STRING(20),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: TableName.COLUM_ID_CATEGORY
    },
    CREATED_BY_MANAGER: {
        type: DataTypes.STRING(20),
        field: TableName.COLUM_ID_MANAGER_CATEGORY,
        references: {
            model: TableName.TABLE_MANAGER,
            key: TableName.COLUM_ID_MANAGER
        },
        defaultValue: 'a36d8cec-0793-404c-b'
    },
    CATEGORY_NAME: {
        type: DataTypes.STRING(25),
        field: TableName.COLUM_CATEGORY_NAME
    },
    CREATED_AT: {
        type: DataTypes.STRING, 
        defaultValue: DateTime.getTimeNow().toString(),
        field: TableName.COLUM_CREATED_AT_CATEGORY
      },
    UPDATED_AT: {
        type: DataTypes.STRING(25), 
        defaultValue: DateTime.getTimeNow().toString(),
        field: TableName.COLUM_UPDATED_AT_CATEGORY
    }
}, {
    timestamps: false,
})

export default CategorySchema