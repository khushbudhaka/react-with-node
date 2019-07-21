const NurseModel = require('../models/nurse.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    NurseModel.createNurse(req.body)
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
    NurseModel.list()
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.getById = (req, res) => {
    NurseModel.getById(req.params.nurseId)
        .then((result) => {
            res.status(201).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });
};

exports.removeById = (req, res) => {
    NurseModel.removeById(req.params.nurseId)
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
    NurseModel.patchNurse(req.params.nurseId, req.body)
        .then((result) => {
            res.status(200).send({ 'status': true, 'data': result });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ 'status': false,'error': err.message });
        });

};

