const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
class AuthService {

    async register(userData) {

        const { email, password } = userData;

        // Check if email exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
const userToCreate = {
    ...userData,
    password: hashedPassword
};


const user = await User.create(userToCreate);;

        const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt
};

return userResponse;
    }
    async login(loginData) {

    const { email, password } = loginData;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    // Return response
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}

}

module.exports = new AuthService();