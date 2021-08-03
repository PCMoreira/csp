require('dotenv').config();
const mysqlImport = require('mysql-import');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: `dbCSP`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`,
    port: `${process.env.MYSQL_PORT}`,
});

const executeQuery = async (id, query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, resp) => {
            console.log(`executing query: `);
            if (err) {
                reject(err);
            } else {
                resolve(resp);
            }
        });
    });
};


const executeOne = async (id, query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, resp) => {
            console.log(`executing query: ${id}`);
            if (err) {
                reject(err);
            } else {
                if (resp.length > 1) {
                    reject('expected only one value');
                } else {
                    resolve(resp[0]);
                }
            }
        });
    });
};


const executeFile = async (filepath) => {
    return new Promise((resolve, reject) => {
        const importer = mysqlImport.config({
            host: `${process.env.MYSQL_HOST}`,
            user: `${process.env.MYSQL_USER}`,
            password: `${process.env.MYSQL_PASSWORD}`,
            database: `${process.env.MYSQL_DATABASE}`,
            port: `${process.env.MYSQL_PORT}`,

            onerror: err => reject(err)
        });
        importer.import(filepath).then(() => {
            console.log(`successfully loaded file ${filepath} into database`);
            resolve();
        });
    });
};

module.exports = {
    executeQuery,
    executeOne,
    executeFile,
};
