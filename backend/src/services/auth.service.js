const bcrypt = require("bcrypt");
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

}

module.exports = new AuthService();