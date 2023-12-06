require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')

// APP
const app = express();
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ROUTE
app.use('/product', productRoute)
app.use('/category', categoryRoute)

// ERROR
const errorMiddleware = require('./middlewares/error')
app.use(errorMiddleware)

// SERVER
const PORT = process.env.PORT || 5555
app.listen(PORT, () => console.log(`RUNNING ON PORT : ${PORT}`))
