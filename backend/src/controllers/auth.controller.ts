const loginService = require('../services/login.service')
const registerService = require('../services/register.service')

module.exports = {
    ...loginService,
    ...registerService
}

