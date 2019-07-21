const DoctorsModel = require('../models/doctors.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    var patient = req.body;
    DoctorsModel.createDoctor(req.body)
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
    DoctorsModel.list()
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.getById = (req, res) => {
    DoctorsModel.getById(req.params.doctorId)
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.removeById = (req, res) => {
    DoctorsModel.removeById(req.params.doctorId)
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
    DoctorsModel.patchDoctor(req.params.doctorId, req.body)
        .then((result) => {
            res.status(200).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });

};

