const db = require('../database');

module.exports = {
    getCheckoutById : (req,res) => {
        let sql = `select p.title, c.quantity, c.total, c.id, c.userId, c.departure, c.status from cart c
                    left join products p
                    on p.id = c.productId
                    WHERE userId=${req.query.id} AND c.id=${req.query.cartId};`
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

                res.status(200).send(results)
        })
    },

    getTransaksi : (req,res) => {
        let sql =`SELECT * FROM transaction;`
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },
    
    postTransaksi : (req,res) => {
        console.log(req.query)
        let sql = `SELECT * from cart WHERE productId=${req.query.productId} AND userId=${req.query.userId}`
        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            console.log(results)    
            let {productId, userId, quantity, total, departure, id} = results[0]
            let data = {
                productId, 
                userId, 
                quantity, 
                total, 
                departure,
                status : "Paid"
            }
            sql = `INSERT INTO transaction SET ?`
            db.query(sql, data, (err, results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                sql = `DELETE FROM cart WHERE id=${id}`
                db.query(sql, (err,results) => {
                    if(err) {
                        return res.status(500).send(err)
                    }

                    res.status(200).send(results)
                })
            })
        })
    }
}