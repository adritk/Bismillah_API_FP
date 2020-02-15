const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')
const port = 4000

const app = express();

app.use(bodyParser())
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.status(200).send(`<h1>API TOUR</h1>`)
})


const { userRouter, imageRouter} = require('./router')
app.use('/users', userRouter)
app.use('/image', imageRouter)


app.listen(port, () => console.log('API IS ACTIVE AT PORT ' + port))