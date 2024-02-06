import express from "express"
import WebController from "../../controllers/web/web_controller.js"
import cookieParser from "cookie-parser"

let routes = express.Router()

const initWebRoute = (app) => {
    app.get('/', WebController.getAuthenticationPage)

	return app.use("/", routes)
}

export default initWebRoute