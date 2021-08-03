const R = require('ramda');


const isNull = arg => R.isNil(arg) || R.isEmpty(arg);
const rmAccent = text => text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
const toUpperName = name => `${name.charAt(0).toUpperCase()}${name.substring(1).toLowerCase()}`;
const makeFullName = (first, second) => `${first} ${second}`;



module.exports = {
    rmAccent,
    toUpperName,
    makeFullName,
    isNull
};