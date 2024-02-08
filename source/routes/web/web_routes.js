import express from "express"
import WebController from "../../controllers/web/web_controller.js"
import cookieParser from "cookie-parser"

let routes = express.Router()

const initWebRoute = (app) => {
    app.get('/', WebController.getAuthenticationPage)
    app.get('/home', WebController.getHomePage)
    app.get('/categories', WebController.getCategoryPage)
    app.get('/categories/add', WebController.getCategoryAddPage)
    app.get('/categories/update/:id', WebController.getCategoryUpdatePage)
    app.get('/companies', WebController.getCompanyPage)
    app.get('/companies/add', WebController.getCompanyAddPage)
    app.get('/companies/update/:id', WebController.getCompanyUpdatePage)

    app.post('/categories/search', WebController.handleSearchCategoryByName)

	return app.use("/", routes)
}

export default initWebRoute