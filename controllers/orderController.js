const Order = require("../models/Order");

// 🆕 Создание заказа
exports.createOrder = async (req, res) => {
    try {
        const { products, totalPrice } = req.body;
        const newOrder = await Order.create({
            userId: req.user.id,
            products,
            totalPrice,
        });
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔍 Получение заказов текущего пользователя
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("products.productId");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔄 Обновление статуса заказа (admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ Удаление заказа (admin)
exports.deleteOrder = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
