const siteRouter = require('./site.route')
function route(app : any) {
    app.use('/', siteRouter)
}




module.exports = route