const NurseController = require('./controllers/nurse.controller');

exports.routesConfig = function (app) {
    app.post('/api/nurse', [
        NurseController.insert
    ]);
    app.get('/api/nurse', [
        NurseController.list
    ]);
    app.get('/api/nurse/:nurseId', [
        NurseController.getById
    ]);
    app.patch('/api/nurse/:nurseId', [
        NurseController.patchById
    ]);
    app.delete('/api/nurse/:nurseId', [
        NurseController.removeById
    ]);
    
};