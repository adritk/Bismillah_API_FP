const userRouter = require('./userRouter')
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter')
const packagecatRouter = require('./packagecatRouter')
const cartRouter = require('./cartRouter')
const checkoutRouter = require('./checkoutRouter')

module.exports = {
    userRouter,
    productRouter,
    categoryRouter,
    packagecatRouter,
    cartRouter,
    checkoutRouter
}