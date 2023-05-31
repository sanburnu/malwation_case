const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.cookies["auth-token"];
    if (!token) {
        return res.status(401).render("login", {"status": "401", "message": "Access Denied. Please login to access this page"});
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).render("login", {"status": 400, "message": "Token has expired. Please login again."});
    }
}

module.exports = auth;