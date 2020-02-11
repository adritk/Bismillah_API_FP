 // login : (req,res) => {
    //     const {username, password} = req.body
    //     console.log(req.body)
    //     let sql = `SELECT * FROM users WHERE username='${username}';`;

    //     db.query(sql, (err,results) => {
    //         if(err) res.status(500).send(err)
    //         if(results[0].password === Crypto.createHmac('sha26', 'uniqueKey').update(password).digest('hex')) {
    //             console.log('password match')
    //             if(results[0].verified === 0) {
    //                 console.log(results[0].verified)
    //                 console.log('not verified')
    //             } else {
    //                 if(results && results.length > 0) {
    //                     let {id,username,password,email,role,verified} = results[0]
    //                     const token = createJWTToken({
    //                         id,
    //                         username,
    //                         password,
    //                         email,
    //                         role
    //                     })
    //                     console.log(token)
    //                     return res.status(200).send({
    //                         id,
    //                         username, 
    //                         email, 
    //                         token,
    //                         verified
    //                     })
    //                 } else {
    //                     res.status(200).send('User or Password Invalid')
    //                 }
    //             }
    //         } else {
    //             return res.status(400).send('invalid')
    //         }
    //     })
    // },