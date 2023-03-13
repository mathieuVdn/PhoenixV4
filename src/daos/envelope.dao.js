import Envelope from "../models/envelope.model.js";

const create = async (name, amount, creation_date, type_id, user_id) => {
  let result = null;
  let error = null;
  try {
    result = Envelope.create({
      name,
      amount,
      creation_date,
      type_id,
      user_id,
    });
    return { result };
  } catch (e) {
    error = e.message;
    return { error };
  }
};

const read = async (id) => {
  let result = null;
  try {
    result = await Envelope.findByPk(id);
    return {
      id: result.id,
      name: result.name,
      amount: result.amount,
      creation_date: result.creation_date,
      type_id: result.type_id,
      user_id: result.user_id,
      last_update: result.last_update,
    };
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
const readAll = async (user_id) => {
  let result = null;
  let error = null;
  try {
    result = await Envelope.findAll({
      where: { user_id },
    });
    return {
      id: result.id,
      name: result.name,
      amount: result.amount,
      creation_date: result.creation_date,
      type_id: result.type_id,
      user_id: result.user_id,
    };
  } catch (e) {
    error = e.message;
    return { error };
  } finally {
    return { result, error };
  }
};

const update = async (id, name, amount, last_update, type_id, user_id) => {
  let result = null;
  try {
    result = await Envelope.update(
      {
        name,
        amount,
        last_update,
        type_id,
        user_id,
      },
      { where: { id } }
    );
  } catch (e) {
    console.log(e.message);
  }
  return result;
};

const deleteEnvelope = async (id) => {
  let result = null;
  try {
    result = await Envelope.destroy({
      where: { id },
    });
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
export const EnvelopeDao = {
  create,
  readAll,
  read,
  update,
  deleteEnvelope,
};
