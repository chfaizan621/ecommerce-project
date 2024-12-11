const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./models/product'); // Adjust the path if necessary



const createFakeProduct = () => {
    return new Product({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        discountPercentage: Math.random() * 100,
        rating: Math.random() * 5,
        stock: Math.floor(Math.random() * 100),
        brand: faker.company.name(),
        category: faker.commerce.department(),
        thumbnail: faker.image.url(),
        images: faker.image.url() + ', ' + faker.image.url()
    });
};

const populateProducts = async (num) => {
    for (let i = 0; i < num; i++) {
        const product = createFakeProduct();
        try {
            await product.save();
            console.log(`Product ${i + 1} saved`);
        } catch (err) {
            console.error(err);
        }
    }
    mongoose.connection.close();
};

populateProducts(30);