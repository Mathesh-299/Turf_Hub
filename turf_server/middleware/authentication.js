const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Token not valid" });
        req.user = user;
        // console.log(req.user)
        next();
    });
};

const adminAccess = (req, res, next) => {
    const role = req.user.role;
    // console.log("User role:", role);

    if (role !== 'admin' && role !== 'owner') {
        return res.status(403).json({ role, message: "Only admin or owner can access" });
    }

    next();
};

module.exports = { authenticateJWT, adminAccess };
