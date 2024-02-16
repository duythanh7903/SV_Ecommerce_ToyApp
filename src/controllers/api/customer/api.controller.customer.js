import { pool } from "../../../configs/database.js"

const getAllProducts = async (req, res) => {
    const queryGetAllProducts = 
        `SELECT products.*, categories.category_name, managers.user_name as manager_name,
        companies.company_name
        FROM products
        JOIN categories ON categories.id = products.id_category
        JOIN managers ON managers.id = products.created_by_manager
        JOIN companies ON companies.id = products.created_by_company
        WHERE products.gia_ban != 0 AND products.gia_nhap != 0 AND products.quantity > 0
        ORDER BY STR_TO_DATE(products.created_at, '%d/%m/%Y %H:%i:%s') DESC`
    const queryGetImageProduct = 
        `SELECT image_products.* FROM image_products
        INNER JOIN  products ON image_products.id_product = products.id
        ORDER BY STR_TO_DATE(products.created_at, '%d/%m/%Y %H:%i:%s') DESC`

    // query all data in database
    const [products, productFields] = await pool.execute(queryGetAllProducts)
    const [images, imageFields] = await pool.execute(queryGetImageProduct)

    // format object json
    products.forEach((product, index) => { product.images = images.filter(image => image.id_product === product.id) })

    return res.status(200).json(products)
}

const CustomerController = {
    getAllProducts
}

export default CustomerController