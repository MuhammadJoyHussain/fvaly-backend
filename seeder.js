const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Store = require('./models/Store');
const Product = require('./models/Product');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Read JSON files
const store = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/Store.json`, 'utf-8')
);

const product = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/product.json`, 'utf-8')
);

const category = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/category.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await Store.create(store);
        await Product.create(product);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Store.deleteMany();
        await Product.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}