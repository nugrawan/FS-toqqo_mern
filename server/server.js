const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const db = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const userValidation = require('./middleware/userValidation')

app.use(cors())
app.use(express.json());
app.use(cookieparser());

app.use('/api/products', userValidation, require('./routes/productRouter'))
app.use('/api/order', userValidation, require('./routes/orderRouter'))
app.use('/api/user', require('./routes/userRouter'))


const connectToDatabse = async () => {
    try {
        await db.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectToDatabse();
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})