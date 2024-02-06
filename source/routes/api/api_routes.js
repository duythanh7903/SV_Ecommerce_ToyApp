import express from "express"
import ManagerController from "../../controllers/api/manager/api.controller.manager.js"

let routes = express.Router()

const initApiRoutes = (app) => {
    routes.post('/manager/signup', ManagerController.handleSignUp)
    routes.post('/manager/login', ManagerController.handleLogin)

    return app.use('/duylt/api/v1', routes)
}

export default initApiRoutes