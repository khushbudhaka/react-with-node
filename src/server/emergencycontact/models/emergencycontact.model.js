const mysql = require('mysql');
const db = require('../../config/database.js');
const modelTable = "emergencycontact";

exports.createEmergencycontact = (contactData) => {
    console.log(contactData);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO '+ modelTable +' SET ?', contactData, (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM '+ modelTable +'', (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });
};

exports.getById = (contactId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${modelTable} WHERE contactId = ${contactId}`, (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });
};

exports.removeById = (contactId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${modelTable} WHERE contactId = ${contactId}`, (err, res, fields) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });
};

exports.patchContact = (contactId, contactData) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${modelTable} SET ? WHERE contactId = ${contactId}`, contactData, (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(res);
                resolve(res);
            }
        });
    });    
}

