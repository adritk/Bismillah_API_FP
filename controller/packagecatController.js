const db = require('../database');

module.exports = {
    getAllPackagecat : (req,res) => {
        let sql = `select pc.id, pc.categoryId, pc.productId,
        p.title, c.category
        from packagecat pc 
        join products p
        on pc.productId = p.id
        join categories c
        on pc.categoryId = c.id
        group by p.title;`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    addPackagecat: (req,res) => {
        let sql = `WITH RECURSIVE category_path (id, category, parentId) AS
        (
          SELECT id, category, parentId
            FROM categories
            WHERE id = ${req.body.categoryId}
          UNION ALL
          SELECT c.id, c.category, c.parentId
            FROM category_path AS cp JOIN categories AS c
              ON cp.parentId = c.id
        )
        SELECT id FROM category_path;`
        db.query(sql, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
            var data = results.map((item) => {
                return [item.id, req.body.productId]
            })

            sql = `INSERT INTO packagecat (categoryId,productId) VALUES ? ;`

            db.query(sql, [data], (err,results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                res.status(200).send(results)
            })
        })
    },

    deletePackagecat : (req,res) => {
        let sql = `DELETE FROM packagecat WHERE productId = ${db.escape(req.params.id)}`;
        db.query(sql, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }
}