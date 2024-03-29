const DATABASE_NAME = 'virgo_ecommerce_toy'
const USER_ROOT = 'root'
const HOST = 'localhost'
const HOST_NAME_APP = '127.0.0.1'
const PORT_APP = 7903

const CODE_API_FAIL = 0
const CODE_API_SUCCESS = 1

const CODE_QUERY_SUCCESS = 1
const CODE_QUERY_FAIL = 0

const MESSAGE_ERROR = 'Something went wrong!'
const MESSASGE_EMAIL_ALREADY_EXIST = 'Email has been registered on the system!'
const MESSAGE_SUCCESS_SIGNUP = 'Account registration successful. Check email for confirmation!'
const MESSAGE_LOGIN_FAIL = 'Account does not exist. Please check your login information again!'

const MESSAGE_CATEGORY_ALREADY_EXIST = 'The category already exists in the system!'

const MESSAGE_COMPANY_ALREADY_EXIST = 'The company already exists in the system!'

const Constants = {
    DATABASE_NAME, USER_ROOT, HOST, HOST_NAME_APP, PORT_APP,

    CODE_API_FAIL, CODE_API_SUCCESS, 
    
    CODE_QUERY_FAIL, CODE_QUERY_SUCCESS,

    MESSAGE_ERROR, MESSASGE_EMAIL_ALREADY_EXIST, MESSAGE_SUCCESS_SIGNUP,
    MESSAGE_LOGIN_FAIL,

    MESSAGE_CATEGORY_ALREADY_EXIST,

    MESSAGE_COMPANY_ALREADY_EXIST
}

export default Constants