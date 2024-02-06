import Constants from '../../../utils/Constants.js'
import ManagerSchema from '../../../model/Manager.js'

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

    const account = ManagerSchema.findOne({
        where: {
            EMAIL: email,
            PASSWORD: password,
            IS_CONFIRM: 1,
            IS_ACTIVE: 1,
            IS_VERIFY: 1,
        }
    })

    return res.status(200).json({
        user: account
    })
}

const ManagerController =  {
    handleSignUp, handleLogin
}

export default ManagerController