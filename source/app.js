import express from "express";
import initWebRoute from "./routes/web/web_routes.js"
import configViewEngine from "./configs/view_engine.js"
import initApiRoutes from "./routes/api/api_routes.js"
import Constants from "./utils/Constants.js"

const app = express()
const HOST_NAME = Constants.HOST_NAME_APP
const PORT = Constants.PORT_APP

app.use(express.urlencoded({ extends: true }))
app.use(express.json())

configViewEngine(app)
initWebRoute(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log(`Your app is running at http://${HOST_NAME}:${PORT}/`)
})