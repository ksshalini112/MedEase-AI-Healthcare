const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No token provided."
            });
        }

        // Check Bearer Token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token Format"
            });
        }

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Save user data
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });

    }

};

module.exports = authenticate;