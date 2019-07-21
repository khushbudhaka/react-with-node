const DoctorsController = require('./controllers/doctors.controller');

exports.routesConfig = function (app) {
    app.post('/api/doctors', [
        DoctorsController.insert
    ]);
    app.get('/api/doctors', [
        DoctorsController.list
    ]);
    app.get('/api/doctors/:doctorId', [
        DoctorsController.getById
    ]);
    app.patch('/api/doctors/:doctorId', [
        DoctorsController.patchById
    ]);
    app.delete('/api/doctors/:doctorId', [
        DoctorsController.removeById
    ]);
    
};