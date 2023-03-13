import Operation from "../models/operation.model.js";

const create = async (amount, date, description, envelope_id, user_id) => {
  let result = null;
  let error = null;
  try {
    result = await Operation.create({
      amount,
      date,
      description,
      envelope_id,
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
    result = await Operation.findByPk(id);
    return {
      id: result.id,
      amount: result.amount,
      date: result.date,
      description: result.description,
      envelope_id: result.envelope_id,
      user_id: result.user_id,
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
    result = await Operation.findAll({
      where: { user_id },
    });
    return {
      id: result.id,
      amount: result.amount,
      date: result.date,
      description: result.description,
      envelope_id: result.envelope_id,
      user_id: result.user_id,
    };
  } catch (e) {
    error = e.message;
    return { error };
  } finally {
    return { result, error };
  }
};

const update = async (id, amount, date, description, envelope_id, user_id) => {
  let result = null;
  let error = null;
  try {
    result = await Operation.update(
      {
        amount,
        date,
        description,
        envelope_id,
        user_id,
      },
      {
        where: { id },
      }
    );
    return { result };
  } catch (e) {
    error = e.message;
    return { error };
  }
};

const remove = async (id) => {
  let result = null;
  let error = null;
  try {
    result = await Operation.destroy({
      where: { id },
    });
    return { result };
  } catch (e) {
    error = e.message;
    return { error };
  }
};

export const OperationDao = {
  create,
  read,
  readAll,
  update,
  remove,
};
