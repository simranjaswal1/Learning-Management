import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from Authorization Header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const token = authHeader.split(" ")[1]; // Get the actual token

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach user data to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token verification failed",
            success: false,
            error: error.message,
        });
    }
};

export default isAuthenticated;
