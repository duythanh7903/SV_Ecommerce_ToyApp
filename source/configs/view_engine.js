import express from 'express'

const configViewEngine = (app) => {
    app.set('view engine', 'ejs')
    app.set('views', './source/views/')

    app.use(express.static('./source/public/'))
}

export default configViewEngine