import TableName from "./TableName.js"

const getQueryGetCategory = (keySearch) => {
    // if keySearch.length == 0 => query get all data else search data
    let querySearch = 
        `SELECT ${TableName.TABLE_CATEGORY}.*, 
        ${TableName.TABLE_MANAGER}.${TableName.COLUM_USER_NAME_MANAGER} AS manager_name
        FROM ${TableName.TABLE_CATEGORY}
        INNER JOIN ${TableName.TABLE_MANAGER} 
        ON ${TableName.TABLE_CATEGORY}.${TableName.COLUM_ID_MANAGER_CATEGORY} = ${TableName.TABLE_MANAGER}.${TableName.COLUM_ID_MANAGER}`
    querySearch = 
        (String(keySearch).length == 0) 
        ? querySearch 
        : `${querySearch} WHERE MATCH(${TableName.COLUM_CATEGORY_NAME}) AGAINST('${keySearch}')`
    
    return querySearch
}

const getQueryGetCompany = (keySearch) => {
    let querySearch =  
        `SELECT ${TableName.TABLE_COMPANY}.*,
        ${TableName.TABLE_MANAGER}.${TableName.COLUM_USER_NAME_MANAGER} AS manager_name
        FROM ${TableName.TABLE_COMPANY}
        INNER JOIN ${TableName.TABLE_MANAGER} 
        ON ${TableName.TABLE_COMPANY}.${TableName.COLUM_ID_MANAGER_COMPANY} = ${TableName.TABLE_MANAGER}.${TableName.COLUM_ID_MANAGER}`
    querySearch = 
        (String(keySearch).length == 0) 
        ? querySearch 
        : `${querySearch} WHERE MATCH(${TableName.COLUM_CATEGORY_NAME}) AGAINST('${keySearch}')`
        
    return querySearch
}

const getQueryDeleteCompany = (id) => {
    const sql =
        `delete from ${TableName.TABLE_COMPANY} 
        where ${TableName.COLUM_ID_COMPANY} = '${id}'`
    
    return sql
}

const MyQueries = {
    getQueryGetCategory,
    getQueryGetCompany,
    getQueryDeleteCompany
}

export default MyQueries