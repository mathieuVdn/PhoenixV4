import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { omit, omitMulti } from "../utils/omit.utils.js";
import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

const signUp = async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;

    const userFound = await UserDAO.findByEmail(email);
    if (userFound)
      return res.status(403).json({ message: `user_already_exists` });
    const password = await hashPassword(req.body.password);
    const user = await UserDAO.create(email, username, password);
    const token = jwtSign(user.id);
    console.log(token);
    res.status(201).json({
      message: "user_created",
      user: {
        id: user.id,
        username,
        email,
      },
      token,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserDAO.findByEmail(email);
    if (!user) return res.status(403).json({ message: `user_not_found` });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(403).json({ message: `invalid_password` });
    const token = jwtSign(user.id);
    res.status(201).json({
      message: "user_connected",
      user: {
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        token,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  let { username, password, email } = req.body;
  const userFound = await UserDAO.findById(id);
  if (!userFound) return res.status(403).json({ message: `user_not_found` });
  if (password) {
    password = await hashPassword(password);
  }
  const user = await UserDAO.update(id, username, password, email);

  res.status(200).json({
    message: "user_updated",
    username,
    email,
  });
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userFound = await UserDAO.findById(id);
    if (!userFound) return res.status(403).json({ message: `user_not_found` });
    const user = await UserDAO.destroy(id);
    res.status(200).json({ message: "user_deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await UserDAO.findAll();
  if (!users) return res.status(403).json({ message: `user_not_found` });
  const usersWithoutPassword = users.map((user) => omit(user, ["password"]));
  res.status(200).json(usersWithoutPassword);
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserDAO.findById(id);
    if (!user) return res.status(403).json({ message: `user_not_found` });
    const userWithoutPassword = omit(user, ["password"]);
    res.status(200).json(userWithoutPassword);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};
export const UserController = {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
