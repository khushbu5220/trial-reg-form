const jwt = require('jsonwebtoken');
const JWT_KEY = 'hnuheduhdy83yeudhuh1293-982ucfhfc(:")@#$%^34566*+=jbfcjkhueduf%$#U&%@@!@!*8gygyghgy'

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}