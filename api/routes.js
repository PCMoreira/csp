const { Router, json, urlencoded } = require('express');
const { name, version } = require('../package.json');
const Joi = require('joi');
const { asyncMiddleware, validate } = require('./basicValidator/base');
const {
    getContacts, getContact,
    createContacts, updateContacts, removeContacts
} = require('./controllers/contactController');

const routes = new Router();
routes.use(json());
routes.use(urlencoded({ extended: true}))

routes.get('/', (req, res) => {
    res.send({name, version})
});

routes.get('/contacts', asyncMiddleware(getContacts));

routes.get('/contact', validate('query', {
    name: Joi.string().lowercase().required(),
    email: Joi.string().lowercase()
}),
asyncMiddleware(getContact)
);

routes.post('/contact', validate('body', {
    name: Joi.string().lowercase().required(),
    family_name: Joi.string().lowercase().required(),
    email: Joi.string().lowercase().required(),
    contact: Joi.string().lowercase().required()
}),
asyncMiddleware(createContacts));

routes.put('/contact', validate('body', {
    id: Joi.number().required(),
    name: Joi.string().lowercase().required(),
    family_name: Joi.string().lowercase().required(),
    email: Joi.string().lowercase().required(),
    contact: Joi.string().lowercase().required()
}),
asyncMiddleware(updateContacts));

routes.delete('/contact', validate('body', {
    id: Joi.number().required(),
}),
asyncMiddleware(removeContacts));

module.exports = routes;