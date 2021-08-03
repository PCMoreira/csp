const Joi = require('joi');


const joiValidate = (type, params) => {
    const schema = Joi.object(params);
    return schema.validate(type, {
      allowUnknown: true,
    });
};

const validate = (type, params) => (req, res, next) => {
  const { value, error } = joiValidate(req[type], params);
  req[type] = value;
  return error ? res.status(422).send({ error: error.details }) : next();
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err.response && err.response.status && err.response.config) {
      const loggerMsg = 'Error received from request uri (424): '
        .concat(err.response.config.url)
        .concat('\nERROR MESSAGE: ')
        .concat(err.message);
      console.log(loggerMsg);
      return res.sendStatus(424);
    }
    console.log(err.stack);
    return res.sendStatus(500);
  });
};

module.exports = {
  asyncMiddleware,
  validate
};
