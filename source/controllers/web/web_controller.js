const getTestPage = (req, res) => {
    return res.render('test.ejs')
}

const WebController = {
    getTestPage
}

export default WebController