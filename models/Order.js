const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
