import express from "express"
import WebController from "../../controllers/web/web_controller.js"
import cookieParser from "cookie-parser"
import { UploadImage, UploadMultipleImages } from '../../controllers/middleware/UploadImage.js'
import multer from "multer"

let routes = express.Router()

const initWebRoute = (app) => {
    app.get('/', WebController.getAuthenticationPage)
    app.get('/products', WebController.getProductPage)
    app.get('/categories', WebController.getCategoryPage)
    app.get('/categories/add', WebController.getCategoryAddPage)
    app.get('/categories/update/:id', WebController.getCategoryUpdatePage)
    app.get('/companies', WebController.getCompanyPage)
    app.get('/companies/add', WebController.getCompanyAddPage)
    app.get('/companies/update/:id', WebController.getCompanyUpdatePage)
    app.get('/products/add', WebController.getProductAddPage)
    app.get('/products/update/:id', WebController.getProductUpdatePage)

    app.post('/categories/search', WebController.handleSearchCategoryByName)
    app.post('/products/add/handle', (req, res, next) => {
        UploadMultipleImages(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send(`Error 1: ${err.code}`)
            } else if (err) {
                res.send(`Error 2: ${err}`)
            }
            else {
                // make sure to call next() if all was well
                next();
            }
        })
    }, WebController.handleAddProduct)
    app.post('/products/details/:id', WebController.handleShowDetailsProduct)
    app.post('/products/update/handle', WebController.handleUpdateProduct)

	return app.use("/", routes)
}

export default initWebRoute