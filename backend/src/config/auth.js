require('dotenv').config();

module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'batata',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
};