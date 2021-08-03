const mysql = require('mysql');
const db = require('../db');


const getAllContacts = async () => {
    try {
    const query =  `SELECT DISTINCT user_id, user_name, user_name_family, user_email, GROUP_CONCAT(c.contact_phone) as contacts  
                    FROM TB_USERS as u
                    INNER JOIN TB_CONTACTS as c
                    ON u.user_id  = c.contact_user_id 
                    GROUP BY user_id `;
      return await db.executeQuery('getAllContacts', query);
    } catch (error) {
      throw new Error(error);
    }
};

const getContactById = async (id) => {
  try {
    const query = `SELECT DISTINCT user_id, user_name, user_name_family, user_email, GROUP_CONCAT(c.contact_phone) as contacts  
                   FROM dbCSP.TB_USERS as u
                   INNER JOIN TB_CONTACTS as c
                   ON u.user_id  = c.contact_user_id
                   Where u.user_id = ?
                   GROUP BY user_id `;
    return await db.executeOne('getContactById', mysql.format(query, [id]));
  } catch (error) {
    throw new Error(error);
  }
};  

const insertContact = async (contact, userId) => {
  try {
    const query = `INSERT INTO TB_CONTACTS (contact_user_id, contact_phone)
                   VALUES(?,?)`;
    const result = await db.executeQuery('postContact', mysql.format(query, [userId, contact]));
    console.log('result=====', result);
    return result;
  } catch (error) {
    throw new Error(error);
  }

};

const updateContactById = async (contact, userId) => {
  try {
    const query = `INSERT INTO TB_CONTACTS (contact_user_id, contact_phone)
                   VALUES(?,?)`;
    return await db.executeQuery('postContact', mysql.format(query, [userId, contact]));
  } catch (error) {
    throw new Error(error);
  }

};

const removeContactById = async (userId) => {
  try {
    const query = `DELETE FROM TB_CONTACTS
                   WHERE contact_user_id=?;`;
    const result = await db.executeQuery('deleteUserById', mysql.format(query, [userId]));
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  insertContact,
  updateContactById,
  removeContactById
};