const EmergencycontactModel = require('../models/emergencycontact.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    EmergencycontactModel.createEmergencycontact(req.body)
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
    EmergencycontactModel.list()
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.getById = (req, res) => {
    EmergencycontactModel.getById(req.params.contactId)
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.removeById = (req, res) => {
    EmergencycontactModel.removeById(req.params.contactId)
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
    EmergencycontactModel.patchContact(req.params.contactId, req.body)
        .then((result) => {
            res.status(200).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });

};

