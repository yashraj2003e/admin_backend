import bcryptjs from "bcryptjs";
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
    const user = await Prisma.user.findUnique({
      where: { id },
    });

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;

  const { password, ...inputs } = req.body;
  let hashedPassword = "";

  try {
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    await Prisma.user.update({
      where: { id },
      data: {
        ...(inputs && inputs),
        ...(password && { password: hashedPassword }),
      },
    });

    res.status(200).json({ message: "Updated Successfully !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some Error Occurred !" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    await Prisma.user.delete({
      where: { id },
    });
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully Deleted User !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some Error Occurred !" });
  }
}

async function deleteAllUsers(req, res) {
  await Prisma.user.deleteMany();
  res.status(200).json({ message: "Delete All Users !" });
}

export { getUser, getUsers, updateUser, deleteUser, deleteAllUsers };
