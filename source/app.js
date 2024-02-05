import express from "express";
import initWebRoute from "./routes/web/web_routes"
import configViewEngine from "./configs/view_engine"
import Constants from "./utils/Constants";

const app = express()
const HOST_NAME = Constants.HOST_NAME_APP
const PORT = Constants.PORT_APP

app.use(express.urlencoded({ extends: true }))
app.use(express.json())

configViewEngine(app)
initWebRoute(app)

app.listen(PORT, () => {
    console.log(`Your app is running at http://${HOST_NAME}:${PORT}/`)
})