import { EnvelopeDao } from "../daos/envelope.dao.js";
import { getCurrentDate } from "../utils/date.utils.js";

const createEnvelope = async (req, res) => {
  try {
    const name = req.body.name;
    const amount = req.body.amount;
    const creation_date = getCurrentDate();
    const type_id = req.body.type_id;
    const user_id = req.body.user_id;

    const envelope = await EnvelopeDao.create(
      name,
      amount,
      creation_date,
      type_id,
      user_id
    );
    res.status(201).json({
      message: "envelope_created",
      envelope: {
        name: envelope.name,
        amount: envelope.amount,
        creation_date: envelope.creation_date,
        type_id: envelope.type_id,
        user_id: envelope.user_id,
        last_update: envelope.last_update,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const readEnvelope = async (req, res) => {
  try {
    const id = req.params.id;
    const envelope = await EnvelopeDao.read(id);
    if (!envelope)
      return res.status(403).json({ message: `envelope_not_found` });
    res.status(201).json({
      message: "envelope_found",
      envelope: {
        id: envelope.id,
        name: envelope.name,
        amount: envelope.amount,
        creation_date: envelope.creation_date,
        last_update: envelope.last_update,
        type_id: envelope.type_id,
        user_id: envelope.user_id,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};
const readAllEnvelopes = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const envelopes = await EnvelopeDao.readAll(user_id);
    if (!envelopes)
      return res.status(403).json({ message: `envelopes_not_found` });
    res.status(201).json({
      message: "envelopes_found",
      envelopes,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};

const updateEnvelope = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const amount = req.body.amount;
    const last_update = getCurrentDate();
    const type_id = req.body.type_id;
    const user_id = req.body.user_id;
    const envelope = await EnvelopeDao.update(
      id,
      name,
      amount,
      last_update,
      type_id,
      user_id
    );
    if (!envelope) res.status(404).json({ message: "envelope_not_found" });
    res.status(201).json({
      message: "envelope_updated",
      envelope: {
        name,
        amount,
        last_update,
        type_id,
        user_id,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};
const deleteEnvelope = async (req, res) => {
  try {
    const id = req.params.id;
    const envelope = await EnvelopeDao.deleteEnvelope(id);
    if (!envelope) res.status(404).json({ message: "envelope_not_found" });
    res.status(201).json({
      message: "envelope_deleted",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "internal_server_error" });
  }
};
export const EnvelopeController = {
  createEnvelope,
  readAllEnvelopes,
  readEnvelope,
  updateEnvelope,
  deleteEnvelope,
};
