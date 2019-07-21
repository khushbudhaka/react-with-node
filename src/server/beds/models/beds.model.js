const mysql = require('mysql');
const db = require('../../config/database.js');
const modelTable = "patientbeds";

exports.createBed = (bedData) => {
    console.log(bedData);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO patientbeds SET ?', bedData, (err, res) => {
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

exports.getById = (doctorId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${modelTable} WHERE doctorId = ${doctorId}`, (err, res) => {
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

exports.removeById = (doctorId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${modelTable} WHERE doctorId = ${doctorId}`, (err, res, fields) => {
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

exports.patchDoctor = (doctorId, doctorsData) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${modelTable} SET ? WHERE doctorId = ${doctorId}`, doctorsData, (err, res) => {
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

