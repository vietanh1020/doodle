"use strict";
const authRouter = require('./auth.route');
const pollRouter = require('./poll.route');
function route(app) {
    app.use('/poll', pollRouter);
    app.use('/', authRouter);
}
module.exports = route;
