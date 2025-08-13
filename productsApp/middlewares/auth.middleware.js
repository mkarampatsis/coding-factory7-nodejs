const verifyAccessToken = require('../services/auth.service').verifyAccessToken;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token", token);
  
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      console.log("Problem in token verification")
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next();
}

function verifyRoles(allowedRoles) {
    return (req, res, next) => {
        
      if ((!req.user || !req.user.roles)) {
        console.log("Forbidden: No roles found");
        return res.status(403).json({ message: "Forbidden: No roles found" });
      }

      const userRoles = req.user.roles; // Assuming roles are an array in JWT payload
      const hasPermission = userRoles.some(role => allowedRoles.includes(role));

      if (!hasPermission) {
        console.log("Forbidden: Insufficient permissions")
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }
  
      next();
    }
}

module.exports = { verifyToken, verifyRoles }