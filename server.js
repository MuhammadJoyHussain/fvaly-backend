const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleweres/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const product = require('./routes/product');
const store = require('./routes/store');
const merchant = require('./routes/merchant');
const dashboard = require('./routes/dashboard');
const users = require('./routes/users');
const auth = require('./routes/auth');

// Connect DB
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middlewere
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount router
app.use('/api/product', product);
app.use('/api/store', store);
app.use('/api/merchant', merchant);
app.use('/api/dashboard', dashboard);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server runngin in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});