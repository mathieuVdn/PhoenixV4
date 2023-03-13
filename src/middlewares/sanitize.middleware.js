import { log } from "../utils/log.utils.js";
import { isString } from "../utils/string.utils.js";
import escape from "validator/lib/escape.js";

const sanitize = (obj) => {
  const keys = Object.keys(obj);
  const sanitized = keys.reduce((toBuild, key) => {
    const value = obj[key];
    const escaped = isString(value) ? escape(value) : value;
    return { ...toBuild, [key]: escaped };
  }, {});
  return { ...sanitized };
};

export const sanitizeMiddleware = (req, res, next) => {
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);
  console.log("-------------------------------------------------");
  log(`url requested =`, req.originalUrl);
  log(`sanitized body =`, req.body);
  next();
};
