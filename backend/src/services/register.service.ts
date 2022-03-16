const db = require('../models')
import bcrypt from 'bcryptjs';

// [POST] /register
class RegisterService {
    async createUser(user: { email: string, password: string, firstName: string, lastName: string }) {

        const salt = bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(user.password, salt)

        const newUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: hashed,
            createdAt: Date.now(),
            updatedAt: null
        }
        db.Users.create(newUser)
    }
}

module.exports = new RegisterService