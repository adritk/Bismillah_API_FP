const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')
const port = 4000
const { userRouter} = require('./router')

const app = express();

app.use(bodyParser())
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.status(200).send(`<h1>API TOUR</h1>`)
})


app.use('/users', userRouter)


app.listen(port, () => console.log('API IS ACTIVE AT PORT ' + port))