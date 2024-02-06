
import {Sequelize} from 'sequelize'
import sql from "mysql2/promise"
import Constants from "../utils/Constants.js"

const pool = sql.createPool({
  host: Constants.HOST,
  user: Constants.USER_ROOT,
  database: Constants.DATABASE_NAME,
})

const sequelize = new Sequelize(Constants.DATABASE_NAME, Constants.USER_ROOT, '', {
  host: Constants.HOST,
  dialect: 'mysql',
  pool: pool,
})

export {
  pool,
  sequelize
}