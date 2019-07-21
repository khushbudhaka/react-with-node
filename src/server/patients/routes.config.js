const PatientsController = require('./controllers/patients.controller');

exports.routesConfig = function (app) {
    app.post('/api/patients', [
        PatientsController.insert
    ]);
    app.get('/api/patients', [
        PatientsController.list
    ]);
    app.get('/api/patients/:patientId', [
        PatientsController.getPatientById,
        PatientsController.getPatientDoctor,
        PatientsController.getPatientNurse,
        PatientsController.getPatientEmergencyContact,
        PatientsController.sendData
    ]);
    app.patch('/api/patients/:patientId', [
        PatientsController.patchById
    ]);
    app.delete('/api/patients/:patientId', [
        PatientsController.removeById
    ]);
    app.post('/api/patients/sendNotification/:patientId/:weight', [
        PatientsController.getPatientById,
        PatientsController.getPatientDoctor,
        PatientsController.getPatientNurse,
        PatientsController.sendNotification
    ]);
    
};