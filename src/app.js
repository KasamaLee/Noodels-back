require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')
const cartRoute = require('./routes/cartRoute')
const orderRoute = require('./routes/orderRoute')

// APP
const app = express();
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ROUTE
app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)

// ERROR
const errorMiddleware = require('./middlewares/error')
app.use(errorMiddleware)

// SERVER
const PORT = process.env.PORT || 5555
app.listen(PORT, () => console.log(`RUNNING ON PORT : ${PORT}`))
