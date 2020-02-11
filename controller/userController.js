const db = require('../database')
const {createJWTToken} = require('../helpers/jwt')
const Crypto = require('crypto')
const transporter = require('../helpers/nodemailer')

module.exports = {
    getUsers : (req,res) => {
        let sql = `SELECT * FROM users;`
        db.query(sql, (err, results) => {
            if(err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    getUserById : (req,res) => {
        const {id} = req.params
        console.log(req.params.id)
        let sql = `SELECT * FROM users WHERE id = ${id}`
        db.query(sql, (err, results) => {
            if(err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    deleteUsers : (req,res) => {
        
        console.log(req.params.id)

        let sql = `DELETE FROM users WHERE id = ${req.params.id}`
        db.query(sql, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(500).send(results)
        })
    },

     login : (req,res) => {
        const {username, password} = req.body
        console.log(req.body)
        let sql = `SELECT * FROM users WHERE username='${username}';`;

        db.query(sql, (err,results) => {
            if(err) res.status(500).send(err)
            if(results[0].password === Crypto.createHmac('sha256', 'uniqueKey').update(password).digest('hex')) {
                console.log('password match')
                if(results[0].verified === 0) {
                    console.log(results[0].verified)
                    console.log('not verified')
                } else {
                    if(results && results.length > 0) {
                        let {id,username,password,email,role,verified} = results[0]
                        const token = createJWTToken({
                            id,
                            username,
                            password,
                            email,
                            role
                        })
                        console.log(token)
                        return res.status(200).send({
                            id,
                            username, 
                            email, 
                            token,
                            verified
                        })
                    } else {
                        res.status(200).send('User or Password Invalid')
                    }
                }
            } else {
                return res.status(400).send('invalid')
            }
        })
    },

    register : (req,res) => {
        var {username, password, email, role} = req.body;

        let hashPassword = Crypto.createHmac('sha256', 'uniqueKey').update(password).digest('hex')

        let sqlInsert = `INSERT INTO users(username,password,email,role,verified) values('${username}', '${hashPassword}', '${email}', '${role}', 0);`;
        db.query(sqlInsert, req.body, (err,results) => {
            if(err) res.send(err)

        let sql = `SELECT * FROM users WHERE username='${username}';`
        db.query(sql, (err, results) => {
            if(err) {
                res.status(500).send(err)
            }
            // console.log(results)
            let verificationLink = `http://localhost:4000/verified?username=${username}&password=${hashPassword}`

            let mailOptions = {
                from : 'Admin <trikur30@gmail.com>',
                to: email,
                subject: 'Confirmation Email',
                html : `
                <h3>Halo</h3> \n
                <a href='${verificationLink}'>
                    Click Here to Verify your account
                </a>`
            }
            transporter.sendMail(mailOptions,
                (err,res2) => {
                    if(err){
                        console.log(err)
                        return res.status(500).send({ message : err})
                    }
                    var {id,username,password,email,role,verified}=results[0]
                    const token = createJWTToken({
                        id,
                        username,
                        password,
                        email,
                        role
                    })
                    console.log('success')
                    console.log(verified)

                    return res.status(200).send({
                        id,
                        username,
                        password,
                        email,
                        role,
                        token,
                        verified
                    })
                })
            })
        })
    },

    emailVerification : (req,res) => {
        let {username, password} = req.body
        sqlget = `SELECT * FROM users WHERE username = '${username}' AND password= '${password}'`

        db.query(sqlget, req.body, (err,results) => {
            if(err) {
                res.status(500).send(err)
            }

            let sqlupdate = `UPDATE users SET verified = 1 WHERE username = '${username}'`
            db.query(sqlupdate, (err,results) => {
                if(err) {
                    res.status(500).send(err)
                }

                return res.status(200).send({message : 'success'})
            })
        })
    }
}