const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    description: String,
    images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);