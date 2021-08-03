const R = require('ramda');
const { makeFullName } = require('../../utils/commons');



const makeContacts = contacts => contacts.map((contact) => {
    const contacs = contact.contacts.split(',');
    return {
        id: contact.user_id,
        fullName: makeFullName(
            contact.user_name,
            contact.user_name_family
            ),
        name: contact.user_name,
        familyName: contact.user_name_family,
        email: contact.user_email,
        contacts: [... new Set(contacs)]
    };
});

const makeContact = contact => {
    const contacs = contact.contacts.split(',');
    return {
        id: contact.user_id,
        fullName: makeFullName(
            contact.user_name,
            contact.user_name_family
            ),
        name: contact.user_name,
        familyName: contact.user_name_family,
        email: contact.user_email,
        contacts: [... new Set(contacs)]
    };
};

const checkFilter = (name, email, users) => {
    if(name && email) {
        return users.filter(item => item.user_name === name && item.user_email === email);
    }
    if(name && !email){
        return users.filter(item => item.user_name === name);
    }
};
module.exports = {
    makeContacts,
    makeContact,
    checkFilter
};