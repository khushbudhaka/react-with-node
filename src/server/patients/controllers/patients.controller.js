const PatientModel = require('../models/patients.model');
const DoctorModel = require('../../doctors/models/doctors.model');
const NurseModel = require('../../nurse/models/nurse.model');
const EmergencycontactModel = require('../../emergencycontact/models/emergencycontact.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    var patient = req.body;
    PatientModel.createPatient(req.body)
        .then((result) => {
            console.log(result);
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.list = (req, res) => {
    PatientModel.list()
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.getById = (req, res) => {
    PatientModel.getById(req.params.patientId)
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.getPatientById = (req, res, next) => {
    PatientModel.getById(req.params.patientId)
        .then((result) => {
            console.log(result);
            // res.status(201).send({ 'status': true, 'data': result });
            console.log('get patient by id');
            console.log(result[0]);
            req.body.patient = result[0];
            return next();
        })
        .catch(err => {
            console.log(err);
            // res.status(400).send({ 'status': false,'error': err.message });
            return res.status(400).send({ 'status': false,'error': err.message });

        });
};

exports.sendData = (req, res, next) => {
    var patient = req.body.patient;
    patient.doctor = req.body.patient.doctor;
    patient.nurse = req.body.patient.nurse;
    res.status(400).send({ 'status': true,'data': patient });
};


exports.getPatientDoctor = (req, res, next) => {
    console.log('getPatientDoctor');
    console.log(req.body.patient);
    var doctorId = req.body.patient.doctorId;
    DoctorModel.getById(doctorId)
        .then((result) => {
            console.log(result);
            req.body.patient['doctor'] = result[0];
            return next();
        })
        .catch(err => {
            console.log(err);
            // res.status(400).send({ 'status': false,'error': err.message });
            return res.status(400).send({ 'status': false,'error': err.message });

        });
};

exports.getPatientNurse = (req, res, next) => {
    var nurseId = req.body.patient.nurseId;
    console.log('nurse id', nurseId);
    NurseModel.getById(nurseId)
        .then((result) => {
            console.log(result);
            req.body.patient['nurse'] = result[0];
            return next();
        })
        .catch(err => {
            console.log(err);
            // res.status(400).send({ 'status': false,'error': err.message });
            return res.status(400).send({ 'status': false,'error': err.message });

        });
};

exports.getPatientEmergencyContact = (req, res, next) => {
    var contactId = req.body.patient.contactId;
    console.log('contactId', contactId);
    EmergencycontactModel.getById(contactId)
        .then((result) => {
            console.log(result);
            req.body.patient['contact'] = result[0];
            return next();
        })
        .catch(err => {
            console.log(err);
            // res.status(400).send({ 'status': false,'error': err.message });
            return res.status(400).send({ 'status': false,'error': err.message });

        });
};

exports.sendNotification = (req, res) => {
    if(req.params.weight <= 30){
        PatientModel.sendNotification(req.params.patientId, req.body.patient, req.params.weight)
            .then((result) => {
                if(result.status == 'failure'){
                    res.status(200).send({ 'status': false,'data': result });    
                }else{
                    res.status(200).send({ 'status': true,'data': result });
                }
            })
            .catch(err => {
                res.status(400).send({ 'status': false,'error': err.message });
            });
    }else{
        res.status(400).send({ 'status': true });
    }

};

exports.removeById = (req, res) => {
    PatientModel.removeById(req.params.patientId)
        .then((result) => {
            console.log(result);
            res.status(200).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.patchById = (req, res) => {
    PatientModel.patchPatient(req.params.patientId, req.body)
        .then((result) => {
            res.status(200).send({});
        });

};



// exports.list = (req, res) => {
//     let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
//     let page = 0;
//     if (req.query) {
//         if (req.query.page) {
//             req.query.page = parseInt(req.query.page);
//             page = Number.isInteger(req.query.page) ? req.query.page : 0;
//         }
//     }
//     UserModel.list(limit, page)
//         .then((result) => {
//             res.status(200).send(result);
//         })
// };

// exports.getById = (req, res) => {
//     UserModel.findById(req.params.userId)
//         .then((result) => {
//             res.status(200).send(result);
//         });
// };
// exports.patchById = (req, res) => {
//     if (req.body.password) {
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
//         req.body.password = salt + "$" + hash;
//     }

//     UserModel.patchUser(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });

// };

