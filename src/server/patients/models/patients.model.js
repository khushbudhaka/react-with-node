const mysql = require('mysql');
const db = require('../../config/database.js');
const request = require('request');

exports.createPatient = (patientData) => {
    console.log(patientData);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO patients SET ?', patientData, (err, res) => {
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
        db.query(`SELECT patients.*, 
            doctors.name as doctorname, doctors.contactNumber as doctorContact, 
            nurse.name as nursename, nurse.contactNumber as nurseContact,
            contact.name as contactname, contact.contactNumber as emergencyContact
            FROM patients 
            JOIN doctors ON doctors.doctorId = patients.doctorId 
            JOIN nurse ON patients.nurseId = patients.nurseId 
            JOIN emergencycontact as contact ON contact.contactId = patients.contactId
            `, (err, res) => {
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

exports.getById = (patientId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT patients.*, patientbeds.arduinoId, patientbeds.wardNo, patientbeds.bedId FROM patients LEFT JOIN patientbeds ON patientbeds.bedId = patients.bedId WHERE patients.patientId = ${patientId}`, (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log('getById');

                console.log(res);
                resolve(res);
            }
        });
    });
};

exports.removeById = (patientId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM patients WHERE patientId = ${patientId}`, (err, res, fields) => {
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

exports.patchPatient = (patientId, patientData) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE patients SET ? WHERE patientId = ${patientId}`, patientData, (err, res) => {
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

exports.sendNotification = (patientId, patientData, weight) => {
    return new Promise((resolve, reject) => {
        console.log(patientData);
        var numbers = [];
        if(patientData.doctor != undefined){
            numbers.push(patientData.doctor.contactNumber);
        }
        if(patientData.nurse != undefined){
            numbers.push(patientData.nurse.contactNumber);
        }
        var recipientNumbers = numbers.toString();
        
        var options = {
            method: 'POST',
            url: 'https://api.textlocal.in/send/',
            headers: 
            {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            form: 
            { 
                apikey: 'text-local-api-key',
                numbers: recipientNumbers,
                message: `
                Alert: IV bag level is down, Room 1 – bed ${bedId}  
                Patient Name : ${patientData.name} 
                Iv bag status: ${weight}% 
                Please take a required action 
                `,
                sender: 'TXTLCL'
            } 
        };

        request(options, function (error, response, body) {
        if (error) {
            reject(error);
        }
            console.log(JSON.parse(body));
            resolve(JSON.parse(body));
        });
    });    
}

