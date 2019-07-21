const mysql = require('mysql');
const db = require('../../config/database.js');
const modelTable = "nurse";

exports.createNurse = (nurseData) => {
    console.log(nurseData);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO '+ modelTable +' SET ?', nurseData, (err, res) => {
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

exports.getById = (nurseId) => {
    console.log(nurseId);
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${modelTable} WHERE nurseId = ${nurseId}`, (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log('nurse Data');
                console.log(res);
                resolve(res);
            }
        });
    });
};

exports.removeById = (nurseId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${modelTable} WHERE nurseId = ${nurseId}`, (err, res, fields) => {
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

exports.patchNurse = (nurseId, nurseData) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${modelTable} SET ? WHERE nurseId = ${nurseId}`, nurseData, (err, res) => {
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

