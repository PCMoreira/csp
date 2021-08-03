const mysql = require('mysql');
const db = require('../db');


const getAllUsers = async () => {
  try {
    const query =  `SELECT * FROM TB_USERS`;
      return await db.executeQuery('getAllContacts', query);
  } catch (error) {
    throw new Error(error);
  }
};

const insertUser = async (name, fName, email) => {
  try {
    const query = `INSERT INTO TB_USERS (user_name, user_name_family, user_email)
                    VALUES(?,?,?)`;
    const result = await db.executeQuery('postContact', mysql.format(query, [name, fName, email]));
    return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
  
};

const updateUserById = async (name, fName, email, id) => {
  try {
    const query =`UPDATE  TB_USERS
                  SET user_name= ?, user_name_family=?, user_email=?
                  WHERE user_id=?;`;
    const result = await db.executeQuery('updateUserById', mysql.format(query, [name, fName, email, id]));
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

const removeUserById = async (userId) => {
  try {
    const query = `DELETE FROM TB_USERS
                   WHERE user_id=?;`;
    const result = await db.executeQuery('deleteUserById', mysql.format(query, [userId]));
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllUsers,
  insertUser,
  updateUserById,
  removeUserById
}