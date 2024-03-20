const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.SERVER_PORT || 3000;
const userValidation = require('./middleware/userValidation');

app.use(cookieParser({ signed: true }, { httpOnly: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.use(express.json());

// Routes
app.use('/api/products', userValidation, require('./routes/productRouter'));
app.use('/api/order', require('./routes/orderRouter'));
app.use('/api/user', require('./routes/userRouter'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const connectToDatabase = async () => {
    try {
        await db.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
connectToDatabase();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
