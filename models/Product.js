const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    tags: { type: [String] }
}, { timestamps: true });

// Составной индекс для категорий и цены
ProductSchema.index({ category: 1, price: 1 });

// Текстовый индекс для поиска по названию и описанию
ProductSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", ProductSchema);