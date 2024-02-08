import { Sequelize } from "sequelize"
import { pool } from "../../configs/database.js"
import CategorySchema from "../../model/Category.js"
import ManagerSchema from '../../model/Manager.js'
import Constants from "../../utils/Constants.js"
import TableName from "../../utils/TableName.js"
import MyQueries from "../../utils/QueriesData.js"
import CompanySchema from "../../model/Company.js"

const getAuthenticationPage = async (req, res) => { return res.render('auth/login_signup_page.ejs') }

const getHomePage = async (req, res) => { return res.render('home/home_page.ejs') }

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

const WebController = {
    getAuthenticationPage, getHomePage, 

    getCategoryPage, getCategoryAddPage, getCategoryUpdatePage, handleSearchCategoryByName,

    getCompanyPage, getCompanyAddPage, getCompanyUpdatePage
}

export default WebController