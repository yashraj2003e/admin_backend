import Prisma from "../lib/prisma.js";

async function getUsers(req, res) {
  try {
    const users = await Prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
}

export { getUser, getUsers };
