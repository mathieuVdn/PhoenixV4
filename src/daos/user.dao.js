import bcrypt from "bcrypt";
import Users from "../models/user.model.js";

const create = async (email, username, password) => {
  let result = null;
  let error = null;
  try {
    result = Users.create({
      username,
      email,
      password,
    });
  } catch (e) {
    error = e.message;
  } finally {
    return { result, error };
  }
};
const findByEmail = async (email) => {
  let result = null;
  try {
    result = await Users.findOne({
      where: { email: email },
    });
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
const findById = async (id) => {
  let result = null;
  try {
    result = await Users.findByPk(id);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
const findAll = async () => {
  let result = null;
  try {
    result = await Users.findAll();
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
const update = async (id, username, password, email) => {
  let result = null;
  try {
    result = await Users.update(
      {
        username,
        password,
        email,
      },
      { where: { id } }
    );
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
const destroy = async (id) => {
  let result = null;
  try {
    result = await Users.destroy({ where: { id } });
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
export const UserDAO = {
  create,
  findByEmail,
  findById,
  update,
  destroy,
  findAll,
};
