const db = require('../database');
const { uploader } = require('../helpers/uploader');
const fs = require('fs');

module.exports = {
    addPackage : (req,res) => {
        console.log('uploader')
        try{
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name : 'image' }])

            upload(req,res, (err) => {
                if(err){
                    console.log(err)
                    return res.status(500).send({message : 'error'})
                }
                const {image} = req.files;
                const imagePath = image ? path +'/' + image[0].filename : null
                // let data = {
                //     imagepath : imagePath
                // }
                const data = JSON.parse(req.body.data)
                data.imagePath = imagePath
                
                let sql = 'insert into products set ?';
                db.query(sql, data, (err,results) => {
                    if(err){
                        console.log(err)
                        //kalo ada error file didelete dari API
                        fs.unlinkSync('./public' + imagePath)
                        return res.status(500).send({message : 'error'})
                    }
                    return res.status(200).send(results)
                })
            })
        }
        catch(err){
            return res.status(500).send({message: 'error broo'})
        }
    },

    getAllPackage : (req,res) => {
        // console.log(req.query)
        let sql = `SELECT * FROM products;`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },

    getTourDomestik : (req,res) => {
        let sql = `select p.id,p.title, p.harga, p.location, p.duration, p.imagePath, c.category 
        from products p
        left join packagecat pc
        on p.id = pc.productId
        left join categories c
        on c.id = categoryId
        where c.category = "Tour Domestik";`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    getPackageById : (req,res) => {
        let sql = `select * from products
        where id = ${req.params.id};`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    getTiketAttraction : (req,res) => {
        let sql = `select p.id,p.title, p.harga, p.location, p.duration, p.imagePath, c.category 
        from products p
        left join packagecat pc
        on p.id = pc.productId
        left join categories c
        on c.id = categoryId
        where c.category = "Tiket Atraksi";`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    getThemePark : (req,res) => {
        let sql = `select p.id,p.title, p.harga, p.location, p.duration, p.imagePath, c.category 
        from products p
        left join packagecat pc
        on p.id = pc.productId
        left join categories c
        on c.id = categoryId
        where c.category = "Theme Park";`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    getWaterPark : (req,res) => {
        let sql = `select p.id,p.title, p.harga, p.location, p.duration, p.imagePath, c.category 
        from products p
        left join packagecat pc
        on p.id = pc.productId
        left join categories c
        on c.id = categoryId
        where c.category = "Water Park";`

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    editPackage : (req,res) => {
        // console.log(req.params.id)
        let sql = `UPDATE products SET ? WHERE id=${db.escape(req.params.id)}`
        db.query(sql, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },

    deletePakage : (req,res) => {
        console.log(req.params.id)
        let sql = `DELETE FROM products WHERE id=${db.escape(req.params.id)}`
        db.query(sql, (err,results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }


}