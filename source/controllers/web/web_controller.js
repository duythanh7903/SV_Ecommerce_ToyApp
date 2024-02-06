
const getAuthenticationPage = async (req, res) => {
    return res.render('auth/login_signup_page.ejs')
}

const WebController = {
    getAuthenticationPage
}

export default WebController