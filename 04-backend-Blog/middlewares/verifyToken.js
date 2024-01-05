const jwt = require("jsonwebtoken");

// Verify Token (Middleware)

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayLoad;

      next();
    } catch (e) {
      return res
        .status(401)
        .json({ message: "INVALID TOKEN, ACCESS DENIED!!!" });
    }
  } else {
    // 401 UNAUTHORIZED
    return res
      .status(401)
      .json({ message: "No Token Provided, ACCESS DENIED!!!" });
  }
}
// ============================

function verifyTokenAndAdmin(req, res, next){
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
        next();
        }
        else{
            // 403 --> Forbidden
            return res.status(403).json({message: "Not Allowed, Only Admin"})
        }

    });
}

// ============================

function verifyTokenAndOnlyUser(req, res, next){
  verifyToken(req, res, ()=>{
      if(req.user.id === req.params.id){
      next();
      }
      else{
      // 403 --> Forbidden
      return res.status(403).json({message: "Not Allowed, Only User Himself"})
      }

  });
}


// ============================

function verifyTokenAndAuthorization(req, res, next){
  verifyToken(req, res, ()=>{
      if(req.user.id === req.params.id || req.user.isAdmin){
      next();
      }
      else{
      // 403 --> Forbidden
      return res.status(403).json({message: "Not Allowed, Only User Himself Or Admin"})
      }

  });
}


module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}