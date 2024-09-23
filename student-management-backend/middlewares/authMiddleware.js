const jwt = require('jsonwebtoken');

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) return res.status(403).send('Access denied. No token provided.');

    const tokenPart = token.split(' ')[1]; 
    if (!tokenPart) return res.status(403).send('Access denied. Malformed token.');

    jwt.verify(tokenPart, 'secret_key', (err, decoded) => {
      if (err) return res.status(401).send('Invalid token.');
      req.user = decoded; 
      next();
    });
  },

  isSuperAdmin: (req, res, next) => {
    if (req.user.role !== 'superadmin') {
      return res.status(403).send('Access denied. Only Super Admins can perform this action.');
    }
    next();
  },

  isAdminOrSuperAdmin: (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).send('Access denied. Only Admins or Super Admins can perform this action.');
    }
    next();
  }
};

module.exports = authMiddleware;
