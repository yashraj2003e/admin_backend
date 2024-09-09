import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.cookie.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized !" });
    return;
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, payload) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized !" });
      return;
    }

    req.userId = payload.id;

    next();
  });
}
