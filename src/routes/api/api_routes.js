import express from "express"
import ManagerController from "../../controllers/api/manager/api.controller.manager.js"

let routes = express.Router()

const initApiRoutes = (app) => {
    routes.post('/manager/signup', ManagerController.handleSignUp)
    routes.post('/manager/login', ManagerController.handleLogin)
    routes.post('/manager/categories/add', ManagerController.handleAddCategory)
    routes.post('/manager/companies/add', ManagerController.handleAddCompany)

    routes.delete('/manager/categories/delete', ManagerController.handleDeleteCategory)
    routes.delete('/manager/companies/delete/:id', ManagerController.handleDeleteCompany)
    routes.delete('/manager/products/delete/:id', ManagerController.handleDeleteProduct)

    routes.put('/manager/categories/update', ManagerController.handleUpdateCategory)
    routes.put('/manager/companies/update', ManagerController.handleUpdateCompany)

    return app.use('/duylt/api/v1', routes)
}

export default initApiRoutes