const db = require('../database');

module.exports = {
    getCart : (req,res) => {
        let sql = `select p.title, c.quantity, c.total, c.date, c.id, c.userId from cart c
                    left join products p
                    on p.id = c.productId
                    WHERE userId=${req.params.id};`
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

                res.status(200).send(results)
        })
    },

    deleteCart : (req, res) => {
        let sql = `DELETE FROM cart WHERE id= ${req.params.id}`
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    postAddToCart : (req,res) => {
        let {productId, quantity, total, harga} = req.body
        // console.log(req.user.id)
        // console.log(productId)
        // console.log(quantity)
        // console.log(req.body)

        let sql = `SELECT * FROM cart WHERE productId=${productId} AND userId=${req.user.id}`
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            
            // console.table(results)
            if(results.length === 0) {
                let sql = `INSERT INTO cart(productId, userId, quantity, total) VALUES (${productId}, ${req.user.id}, ${quantity}, ${total})`
                db.query(sql, (err, results) => {
                    if(err) return res.status(500).send(err)
                    res.status(200).send(results)
                    console.log('masuk')
                })
            } else {
                let sql = `UPDATE cart SET quantity = quantity + ${quantity}, total = quantity * ${harga} WHERE id = ${results[0].id}`
                db.query(sql, (err, results) => {
                    if(err) {
                        return res.status.send(err)
                    }
                    
                    res.status(200).send(results)
                })
            }
        })
    }
}

        //             sql = `UPDATE cart SET quantity = quantity + ${quantity}, total = quantity * ${harga} WHERE id =${id}`
        //             db.query(sql, (err,results) => {
        //                 if(err) {
        //                     res.status(500).send(err)
        //                 }

        //                 return res.status(200).send(results)
        //             })
        //         })
        //     }
        // })