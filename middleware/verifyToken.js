import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    res.status(401).json({ message: "Unauthorized !" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized User!" });
      return;
    }

    req.userId = payload.id;

    next();
  });
}
