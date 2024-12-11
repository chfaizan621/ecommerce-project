const Product = require('../models/product');
const AsyncError = require("../middleware/asyncError"); 

exports.createProduct = AsyncError( async (req, res, next) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

});

exports.getAllProducts = AsyncError( async (req, res, next) => {
    const products = await Product.find();
    res.json(products);
});

exports.getProductById = AsyncError( async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

exports.updateProduct = AsyncError( async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
});   

exports.deleteProduct = AsyncError( async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
});