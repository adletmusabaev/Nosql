const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // ✅ Исправлено name → username
    email: { type: String, required: true, unique: true },  // ✅ Теперь email обязателен
    password: { type: String, required: true },  // ✅ Пароль обязателен
    role: { type: String, enum: ["customer", "admin"], default: "customer" } // ✅ customer разрешён
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
