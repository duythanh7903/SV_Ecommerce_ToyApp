import Constants from '../../../utils/Constants.js'
import ManagerSchema from '../../../model/Manager.js'
import CategorySchema from '../../../model/Category.js'
import TableName from '../../../utils/TableName.js'
import { pool } from '../../../configs/database.js'
import CompanySchema from '../../../model/Company.js'
import DateTime from '../../../utils/Date.js'
import MyQueries from '../../../utils/QueriesData.js'
import {v4 as uuidV4} from 'uuid'

const handleSignUp = async (req, res) => {
    const {email, user_name, password} = req.body

    try {
        const existingManagerByEmail = await ManagerSchema.findOne({ where: { 
            EMAIL: email
         } })
        if (existingManagerByEmail) {
                return res.status(200).json({
                    code: Constants.CODE_API_FAIL,
                    message: Constants.MESSASGE_EMAIL_ALREADY_EXIST,
                    user: {}
                })
            }
        
        const user = await ManagerSchema.create({
            USER_NAME: user_name,
            EMAIL: email,
            PASSWORD: password,
        })

        return res.status(200).json({
            code: Constants.CODE_API_SUCCESS,
            message: Constants.MESSAGE_SUCCESS_SIGNUP,
            user: user
        })
    } catch (err) {
        console.error(
            `ERROR WHEN QUERY DATA: ${err.message}`
        )
        return res.status(200).json({
            code: Constants.CODE_API_FAIL,
            message: Constants.MESSAGE_ERROR,
            user: {}
        })
    }
}

const handleLogin = async (req, res) => {
    const {email, password} = req.body

    console.log(email, password)

    const account = await ManagerSchema.findOne({
        where: {
            EMAIL: email,
            PASSWORD: password,
            IS_CONFIRM: 1,
            IS_ACTIVE: 1,
            IS_VERIFY: 1,
        }
    })

    if (!account) {
        return res.status(403).json({
            code: Constants.CODE_API_FAIL,
            message: Constants.MESSAGE_LOGIN_FAIL,
            user: {}
        })
    }

    return res.status(200).json({
        code: Constants.CODE_API_SUCCESS,
        message: '',
        user: account,
    })
}

const handleAddCategory = async (req, res) => {
    const { name } = req.body
    try {
        const isCategoryExist = await CategorySchema.findOne({
            where: {
                CATEGORY_NAME: name
            }
        })
    
        if(isCategoryExist) {
            return res.status(200).json({
                code: Constants.CODE_API_FAIL,
                message: Constants.MESSAGE_CATEGORY_ALREADY_EXIST,
                category: {}
            })
        } 
    
        const category = await CategorySchema.create({
            CATEGORY_NAME: name
        })
    
        console.log(JSON.stringify(category))
    
        return res.status(200).json({
            code: Constants.CODE_API_SUCCESS,
            message: '',
            category: category
        }) 
    } catch (err) {
        console.error(`ERROR WHEN INSERT CATEGORY: ${err.message}`)
        return res.status(200).json({
            code: Constants.CODE_API_FAIL,
            message: 'Something went wrong!',
            category: {}
        }) 
    }
}

const handleDeleteCategory = async (req, res) => {
    const { id, name } = req.body
    const queryDelete = 
        `DELETE FROM ${TableName.TABLE_CATEGORY} 
        WHERE ${TableName.COLUM_ID_CATEGORY} = '${id}'`
    try {
        await pool.execute(queryDelete)

        return res.status(200).json({
            message: 'hello',
            code: Constants.CODE_API_SUCCESS,
        })
    } catch(err) {
        console.error(`ERROR WHEN QUERY DATA | <DELETE CATEGORY>: ${err.message}`)
        return res.status(200).json({
            message: Constants.MESSAGE_ERROR,
            code: Constants.CODE_API_FAIL,
        })
    }
}

const handleUpdateCategory = async (req, res) => {
    const {id, name} = req.body
    try {
        const category = await CategorySchema.findOne({
            where: {
                ID: id
            }
        })
        category.CATEGORY_NAME = name
        category.UPDATED_AT = DateTime.getTimeNow()
        await category.save()

        return res.status(200).json({
            message: '',
            code: Constants.CODE_API_SUCCESS
        })
    } catch(err) {
        return res.status(200).json({
            message: Constants.MESSAGE_ERROR,
            code: Constants.CODE_API_FAIL
        })
    }
}

const handleAddCompany = async (req, res) => {
    const {name, url, countries} = req.body
    try {
        const company = await CompanySchema.findOne({
            where: {
                COMPANY_NAME: name,
                COUNTRIES: countries
            }
        })
    
        if (company) {
            return res.status(200).json({
                code: Constants.CODE_API_FAIL,
                message: Constants.MESSAGE_COMPANY_ALREADY_EXIST,
                company: {}
            })
        } 
        
        const companyReponse = await CompanySchema.create({
            COMPANY_NAME: name,
            COUNTRIES: countries,
            IMAGE: url
        })

        return res.status(200).json({
            code: Constants.CODE_API_SUCCESS,
            message: '',
            company: companyReponse
        })
    } catch(err) {
        console.error(`ERORR WHEN QUERY DATA | <INSERT COMPANY>: ${err.message}`)
        return res.status(200).json({
            code: Constants.CODE_API_FAIL,
            message: Constants.MESSAGE_ERROR,
            company: {}
        })
    }
}

const handleUpdateCompany = async (req, res) => {
    const {id, name, link, countries} = req.body

    console.log(id + name + link +countries);

    try {
        const company = await CompanySchema.findOne({
            where: {
                ID: id
            }
        })

        console.log(company);
    
        company.COMPANY_NAME = name
        company.COUNTRIES = countries
        company.IMAGE = link
        company.UPDATED_AT = DateTime.getTimeNow()
        await company.save()

        return res.status(200).json({
            code: Constants.CODE_API_SUCCESS,
            message: '',
            company: company
        })
    } catch(err) {
        console.error(`ERORR WHEN QUERY DATA | <UPDATE COMPANY>: ${err.message}`)
        return res.status(200).json({
            code: Constants.CODE_API_FAIL,
            message: Constants.MESSAGE_ERROR,
            company: {}
        })
    }
}

const handleDeleteCompany = async (req, res) => {
    const id = req.params.id
    const sql = MyQueries.getQueryDeleteCompany(id)
    try {
        await pool.execute(sql)

        return res.status(200).json({
            messsage: '',
            code: Constants.CODE_API_SUCCESS
        })
    } catch (err) {
        return res.status(200).json({
            message: Constants.MESSAGE_ERROR,
            code: Constants.CODE_API_FAIL,
        })
    }
}

const handleDeleteProduct = async (req, res) => {
    const id = req.params.id
    const queryDeleteProduct = 
        `DELETE FROM products WHERE ID = '${id}'`
    try {
        await pool.execute(queryDeleteProduct)

        return res.status(200).json({
            message: '',
            code: Constants.CODE_API_SUCCESS
        })
    } catch (err) {
        return res.status(200).json({
            message: Constants.MESSAGE_ERROR,
            code: Constants.CODE_API_FAIL
        })
    }
}

const handleImportPriceOfGoods = async (req, res) => {
    const {idProduct, cost, price, quantity} = req.body
    const createdAt = DateTime.getTimeNow()
    const updatedAt = createdAt
    const sumPrice = quantity * cost
    const idBill = uuidV4()
    const queryUpdatePriceProduct = 
        `UPDATE products
        SET gia_nhap = ${cost}, gia_ban = ${price}, updated_at = '${updatedAt}', quantity = products.quantity + ${quantity}
        WHERE products.id = '${idProduct}'`
    const queryCreateBillImport = 
        `INSERT INTO bill_import_goods (id, created_by_manager, id_product, gia_nhap, quantity_import, tong_hoa_don, created_at)
        VALUES ('${idBill}', 'a36d8cec-0793-404c-b', '${idProduct}', ${cost}, ${quantity}, ${sumPrice}, '${createdAt}')`
    
    try {
        await pool.execute(queryUpdatePriceProduct)
        await pool.execute(queryCreateBillImport)

        return res.status(200).json({
            message: '',
            code: Constants.CODE_API_SUCCESS
        })
    } catch(err) {
        console.error(`ERROR WHEN UPDATE PRODUCT: ${err.message}`)
        return res.status(200).json({
            message: Constants.MESSAGE_ERROR,
            code: Constants.CODE_API_FAIL
        })
    }
}

const ManagerController =  {
    handleSignUp, handleLogin,

    handleAddCategory, handleDeleteCategory, handleUpdateCategory,

    handleAddCompany, handleUpdateCompany, handleDeleteCompany,

    handleDeleteProduct, handleImportPriceOfGoods
}

export default ManagerController