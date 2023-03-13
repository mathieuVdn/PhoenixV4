import { OperationDao } from "../daos/operation.dao.js";
import { getCurrentDate } from "../utils/date.utils.js";

const createOperation = async (req, res) => {
  try {
    const amount = req.body.amount;
    const date = getCurrentDate();
    const description = req.body.description;
    const envelope_id = req.body.envelope_id;
    const operation = await OperationDao.create(
      amount,
      date,
      description,
      envelope_id
    );
    console.log(operation);
    res.status(201).json({
      message: "operation_created",
      operation: {
        amount,
        date,
        description,
        envelope_id,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const readOperation = async (req, res) => {
  try {
    const id = req.params.id;
    const operation = await OperationDao.read(id);
    if (!operation)
      return res.status(403).json({ message: `operation_not_found` });
    res.status(201).json({
      message: "operation_found",
      operation: {
        id: operation.id,
        amount: operation.amount,
        date: operation.date,
        description: operation.description,
        envelope_id: operation.envelope_id,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const readAllOperations = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const operations = await OperationDao.readAll(user_id);
    if (!operations)
      return res.status(403).json({ message: `operations_not_found` });
    res.status(201).json({
      message: "operations_found",
      operations: operations,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const updateOperation = async (req, res) => {
  try {
    const id = req.params.id;
    const amount = req.body.amount;
    const date = getCurrentDate();
    const description = req.body.description;
    const envelope_id = req.body.envelope_id;
    const user_id = req.body.user_id;
    const operation = await OperationDao.update(
      id,
      amount,
      date,
      description,
      envelope_id,
      user_id
    );
    if (!operation)
      return res.status(403).json({ message: `operation_not_found` });
    res.status(201).json({
      message: "operation_updated",
      operation: {
        id,
        amount,
        date,
        description,
        envelope_id,
        user_id,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const deleteOperation = async (req, res) => {
  try {
    const id = req.params.id;
    const operation = await OperationDao.remove(id);
    if (!operation)
      return res.status(403).json({ message: `operation_not_found` });
    console.log(operation);
    res.status(201).json({ message: "operation_deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

export const OperationController = {
  createOperation,
  readOperation,
  readAllOperations,
  updateOperation,
  deleteOperation,
};
