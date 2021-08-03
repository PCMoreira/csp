const { rmAccent, toUpperName, makeFullName } = require('../../utils/commons');
const { makeContacts, checkFilter, makeContact } = require('../domain/contact');
const { getAllContacts, getContactById, insertContact, removeContactById } = require('../repositories/contactRepository');
const { getAllUsers, insertUser, updateUserById, removeUserById } = require('../repositories/userRepository');
const USER_NOT_EXISTS = 'User does not exist';

const getContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        const response = makeContacts(contacts);
        return res.status(200).send({data: response});
    } catch (error) {
        console.log(error);
    }
};

const getContact = async (req, res) => {
    try {
        const inputName = rmAccent(req.query.name);
        const name = toUpperName(inputName);
        const email = req.query.email || null;
        const users = await getAllUsers();
        const checkedFilter = checkFilter(name, email, users);
        const userContact = await Promise.all(
            checkedFilter.map( async(id) => {
                const user = await getContactById(id.user_id);
                console.log('user ===', user);
                return user;
            })
        ); 
        const response = makeContacts(userContact);
        return res.status(200).send({data: response});

    } catch (error) {
        console.log(error);
    }
};

const createContacts = async(res, req) => {
    try {
        const inputName = rmAccent(res.body.name);
        const name = toUpperName(inputName);
        const inputFName = rmAccent(res.body.family_name);
        const familyName = toUpperName(inputFName);
        const email = res.body.email;
        const inputContact = res.body.contact;
        const user = await insertUser(name, familyName, email);
        await insertContact(inputContact, user);
        return req.status(201).send({
            message:`User ${makeFullName(name, familyName)} was created.`
        });
    } catch (error) {
        console.log(error);

    };
};

const updateContacts = async(res, req) => {
    try {
        const userId = res.body.id;
        const inputName = rmAccent(res.body.name);
        const name = toUpperName(inputName);
        const inputFName = rmAccent(res.body.family_name);
        const familyName = toUpperName(inputFName);
        const email = res.body.email;
        const inputContact = res.body.contact;
        await updateUserById(name, familyName, email, userId);
        await insertContact(inputContact, userId);
        const user = await getContactById(userId);
        return req.status(200).send({data: makeContact(user)});
    } catch (error) {
        console.log(error);

    };
};

const removeContacts = async (req, res) => {
  try {
      const userId = req.body.id;
      console.log('userID ---', userId);
      await removeContactById(userId);
      await removeUserById(userId);
      return res.status(200).send({
        message: 'User has been deleted'
      });
    } catch (error) {
      console.log(error);
    }
};

module.exports = {
    getContacts,
    getContact,
    createContacts,
    updateContacts,
    removeContacts
};