const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword,
            role: role || "customer"  // Если роль не передана, будет "customer"
        });
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
};