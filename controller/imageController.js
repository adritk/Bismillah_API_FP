const db = require('../database');
const { uploader } = require('../helpers/uploader');
const fs = require('fs');

module.exports = {
    uploadImage : (req,res) => {
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
                let data = {
                    imagepath : imagePath
                }
                
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
            return res.status(500).send({message: 'error'})
        }
    },

    getAllImages : (req,res) => {
        // console.log(req.query)
        let sql = `SELECT * FROM products;`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },

    createPackage : (req,res) => {
        // console.log(req.params.id)
        let sql = `UPDATE products SET ? WHERE id=${req.params.id}`
        db.query(sql, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }


}