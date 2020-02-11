const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : 'trikur30@gmail.com',
        pass: 'zzntrydsjmczklrx'
    },
    tls : {
        rejectUnauthorized :  false
    }
})

module.exports = transporter;