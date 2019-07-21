const EmergencycontactController = require('./controllers/emergencycontact.controller');

exports.routesConfig = function (app) {
    app.post('/api/emergencycontact', [
        EmergencycontactController.insert
    ]);
    app.get('/api/emergencycontact', [
        EmergencycontactController.list
    ]);
    app.get('/api/emergencycontact/:contactId', [
        EmergencycontactController.getById
    ]);
    app.patch('/api/emergencycontact/:contactId', [
        EmergencycontactController.patchById
    ]);
    app.delete('/api/emergencycontact/:contactId', [
        EmergencycontactController.removeById
    ]);
    
};