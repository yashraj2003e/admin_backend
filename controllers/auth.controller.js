import Prisma from "../lib/prisma.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await Prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid Credentials !" });
      return;
    }

    const isCorrectPassword = await bcryptjs.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(401).json({ message: "Invalid Credentials !" });
      return;
    }

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: age,
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        // secure: true,
      })
      .status(200)
      .json({ message: "Logged In Successfully !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unable to login !" });
  }
}

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await Prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Unable to create User !" });
    }

    res.status(201).json({ message: "Successfully Registered !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unable to register !" });
  }
}

async function logout(req, res) {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logged out successfully !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unable to logout !" });
  }
}

export { login, register, logout };
