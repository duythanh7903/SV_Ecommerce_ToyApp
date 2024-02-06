import {DataTypes, Sequelize} from 'sequelize'
import TableName from '../utils/TableName.js'
import DateTime from '../utils/Date.js'
import {sequelize} from '../configs/database.js'

const ManagerSchema = sequelize.define(TableName.TABLE_MANAGER, {
   ID : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: TableName.COLUM_ID_MANAGER
  },
  USER_NAME: {
    type: DataTypes.STRING(25),
    defaultValue: '',
    allowNull: false,
    field: TableName.COLUM_USER_NAME_MANAGER
  },
  EMAIL: {
    type: DataTypes.STRING(25),
    defaultValue: '',
    allowNull: false,
    unique: true,
    field: TableName.COLUM_EMAIL_MANAGER
  },
  PASSWORD: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
    field: TableName.COLUM_PASSWORD_MANAGER
  },
  PHONE_NUMBER: {
    type: DataTypes.STRING(15),
    allowNull: true,
    field: TableName.COLUM_PHONE_NUMBER_MANAGER,
  },
  IMAGE: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: TableName.COLUM_IMAGE_MANAGER
  },
  ROLE: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: TableName.COLUM_ROLE_MANGER
  },
  IS_ACTIVE: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: TableName.COLUM_IS_ACTIVE_MANAGER
  },
  IS_CONFIRM: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: TableName.COLUM_IS_CONFIRM_MANAGER
  },
  IS_VERIFY: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: TableName.COLUM_IS_VERIFY_MANAGER
  },
  CREATED_AT: {
    type: DataTypes.STRING, 
    defaultValue: DateTime.getTimeNow().toString(),
    field: TableName.COLUM_CREATED_AT_MANAGER
  },
  UPDATED_AT: {
    type: DataTypes.STRING, 
    defaultValue: DateTime.getTimeNow().toString(),
    field: TableName.COLUM_UDATED_AT_MANAGER
  }
}, {
  timestamps: false // Loại bỏ tự động thêm các trường createdAt và updatedAt
})

export default ManagerSchema
