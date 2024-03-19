const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    const { token } = req.cookies;
    try {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ success: false, message: "Unauthorized" });
            next();
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error })
    }
}

module.exports = jwtVerify;