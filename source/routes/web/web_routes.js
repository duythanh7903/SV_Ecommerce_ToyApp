import express from "express"
import WebController from "../../controllers/web/web_controller"
import cookieParser from "cookie-parser"

let routes = express.Router()

const initWebRoute = (app) => {
    app.get('/', WebController.getTestPage)

	return app.use("/", routes)
}

export default initWebRoute