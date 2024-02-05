import sql from "mysql2/promise"
import Constants from "../utils/Constants"

const pool = sql.createPool({
  host: Constants.HOST,
  user: Constants.USER_ROOT,
  database: Constants.DATABASE_NAME,
})

export default pool