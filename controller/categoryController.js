const db = require('../database');

module.exports = {
    getAllCategory : (req,res) => {
        let sql = `select c.id, c.category as categorychild, c.parentId, ca.category as categoryparent
        from categories c
        left join categories ca
        on c.parentId = ca.id;`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    getCategoryLeaf : (req,res) => {
        let sql = `SELECT
        c1.id, c1.category
    FROM
        categories c1
            LEFT JOIN
        categories c2 ON c2.parentId = c1.id
    WHERE
        c2.id IS NULL;`

        db.query(sql, (err, results) => {
            if(err) {
                res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }
}