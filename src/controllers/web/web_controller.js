import { Sequelize } from "sequelize"
import { pool } from "../../configs/database.js"
import CategorySchema from "../../model/Category.js"
import Constants from "../../utils/Constants.js"
import MyQueries from "../../utils/QueriesData.js"
import CompanySchema from "../../model/Company.js"
import { v4 as uuidv4 } from "uuid"
import DateTime from "../../utils/Date.js"

const getAuthenticationPage = async (req, res) => { return res.render('auth/login_signup_page.ejs') }

const getCategoryPage = async (req, res) => { 
    const sql = MyQueries.getQueryGetCategory('')
    try {
        const [rows, fields] = await pool.execute(sql)
        return res.render('categories/categories_page.ejs', {
            data: rows,
            code: Constants.CODE_QUERY_SUCCESS
        })
    } catch (err) {
        console.error(`ERROR WHEN QUERY DATA <GET CATEGORIES>: ${err}`)
        return res.render('categories/categories_page.ejs', {
            data: [],
            code: Constants.CODE_QUERY_FAIL
        })
    }
}

const getCategoryAddPage = async (req, res) => { return res.render('categories/add_category.ejs') }

const getCategoryUpdatePage = async (req, res) => {
    const id = req.params.id
    const cateogory = await CategorySchema.findOne({
        where: {
            ID: id
        }
    })

    return res.render("categories/update_categories_page.ejs", {
        category: cateogory,
    })
}

const handleSearchCategoryByName = async (req, res) => {
    const { keySearch } = req.body
    const keySearchClear = String(keySearch).trim()
    const querySearch = MyQueries.getQueryGetCategory(keySearch)

    if (keySearchClear.length == 0) {
        return res.redirect('/categories')
    }

    try {
        const [categories, fields] = await pool.execute(querySearch)

        return res.render('categories/categories_page.ejs', {
            data: categories,
            code: Constants.CODE_QUERY_SUCCESS
        })
    } catch(err) {
        return res.redirect('/categories')
    }
}

const getCompanyPage = async (req, res) => {
    const queryGetAllData = MyQueries.getQueryGetCompany('')
    const [companies, fields] = await pool.execute(queryGetAllData)
    
    return res.render('companies/companies_page.ejs', {
        data: companies
    })
}

const getCompanyAddPage = async (req, res) => { return res.render('companies/companies_add_page.ejs') }

const getCompanyUpdatePage = async (req, res) => {
    const id = req.params.id
    const company = await CompanySchema.findOne({
        where: {
            ID: id
        }
    })

    return res.render('companies/companies_update_page.ejs', {
        company: company
    })
}

const getProductPage = async (req, res) => { 
    const querySelectAllProduct = 
        `SELECT products.*, managers.user_name as manager_name,
        categories.category_name, companies.company_name 
        FROM PRODUCTS
        JOIN managers ON managers.ID = products.created_by_manager
        JOIN categories ON categories.id = products.id_category
        JOIN  companies ON companies.ID = products.created_by_company`
    const [products, fields] = await pool.execute(querySelectAllProduct)

    return res.render('products/products_page.ejs', {
        data: products
    })
 }

const getProductAddPage = async (req, res) => { 
    const categories = await CategorySchema.findAll()
    const companies = await CompanySchema.findAll()

    return res.render('products/products_add_page.ejs', {
        categories: categories,
        companies: companies
    })
}

const getProductUpdatePage = async (req, res) => {
    const id = req.params.id
    const querySearchProductById = 
        `SELECT * FROM products 
        WHERE ID = '${id}'`
    const querySelectAllImageByIdProduct =
        `SELECT * FROM image_products WHERE id_product = '${id}'`
    const categories = await CategorySchema.findAll()
    const companies = await CompanySchema.findAll()
    const [products, fields] = await pool.execute(querySearchProductById)
    const [images, imageFields] = await pool.execute(querySelectAllImageByIdProduct)

    console.log(images.map(image => image.path_image).join(','));

    return res.render('products/products_update.ejs', {
        categories: categories,
        companies: companies,
        product: products[0],
        images: images
    })
}

/*
    In this function, first  we verify if the request is a post or not, 
    then we make some validations and finally we add the product to the database.
*/
const handleAddProduct = async (req, res) => {
    const idProduct = uuidv4()
    const {productName, idCategory, idCompany, description} = req.body
    const productNameClear = String(productName).trim()
    const descriptionClear = String(description).trim()
    const createdAt = DateTime.getTimeNow()
    const updatedAt = createdAt
    const arrSrcImage = []
    const files = req.files

    // get path image to save in db
    for (let index = 0, len = files.length; index < len; ++index) {
        arrSrcImage.push(`/images/upload/${files[index].filename}`)
    }

    // handle insert product
    const queryInsertProduct = 
        `INSERT INTO products 
        (ID, CREATED_BY_MANAGER, CREATED_BY_COMPANY, ID_CATEGORY, PRODUCT_NAME, DESCRIPTION, CREATED_AT, UPDATED_AT)
        VALUES (
            '${idProduct}', 'a36d8cec-0793-404c-b', '${idCompany}', '${idCategory}', '${productNameClear}', '${descriptionClear}',
            '${createdAt}', '${updatedAt}'
        )`
    await pool.execute(queryInsertProduct)

    // handle insert image product
    arrSrcImage.forEach(async (item, index) => {
        const pathImage = item
        const idImageProduct = uuidv4()
        const queryInsertImageProduct = 
            `
            INSERT INTO image_products (ID, ID_PRODUCT, PATH_IMAGE)
            VALUES (
                '${idImageProduct}', '${idProduct}', '${pathImage}'
            )
            `
        await pool.execute(queryInsertImageProduct)
    })

    return res.redirect('/products')
}

const handleShowDetailsProduct = async (req, res) => {
    const id = req.params.id
    const querySearchProductById = 
        `SELECT products.*, managers.user_name as manager_name,
        companies.company_name, categories.category_name
        FROM products
        JOIN managers on managers.id = products.created_by_manager
        JOIN companies on companies.id = products.created_by_company
        JOIN categories on categories.id = products.id_category
        WHERE products.id = '${id}';`
    const querySelectAllImageProduct = 
        `SELECT * FROM image_products
        WHERE id_product  = '${id}'`
    
    const [rows, fields] = await pool.execute(querySearchProductById)
    const [images, fieldsImg] = await pool.execute(querySelectAllImageProduct)

    images.forEach((item, index) => {
        console.log(`http://127.0.0.1:7903${item.path_image}`);
    })

    return res.render('products/products_details.ejs', {
        data: rows[0],
        imgs: images
    })
}

const handleUpdateProduct = async (req, res) => {
    const {productName, idCategory, idCompany, description, id} = req.body
    const productNameClear = String(productName).trim()
    const descriptionClear = String(description).trim()
    const updatedAt = DateTime.getTimeNow()
    const queryUpdateProduct = 
        `UPDATE products
        set product_name = '${productNameClear}', description = '${descriptionClear}', 
        id_category = '${idCategory}', created_by_company = '${idCompany}',
        updated_at = '${updatedAt}'
        WHERE products.id = '${id}'`

        console.log(id);

    await pool.execute(queryUpdateProduct)

    return res.redirect('/products')
}

const WebController = {
    getAuthenticationPage,  

    getCategoryPage, getCategoryAddPage, getCategoryUpdatePage, handleSearchCategoryByName,

    getCompanyPage, getCompanyAddPage, getCompanyUpdatePage,

    getProductPage, getProductAddPage, handleAddProduct, handleShowDetailsProduct, 
    getProductUpdatePage, handleUpdateProduct
}

export default WebController