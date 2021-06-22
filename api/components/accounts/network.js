const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.get('/user/:id', getAcountsUser);
router.post('/', upsert);
router.put('/', upsert);
router.put('/cashcredit', getCashCredit);
router.put('/paycredit', payCredit);
router.put('/cashdebit', getCashDebit);
router.put('/depositdebit', depositDebit);

// Internal functions
function list(req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });

}

function get(req, res) {
    Controller.get(req.params.id)
        .then((account) => {
            response.success(req, res, account, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });

}

function getAcountsUser(req, res) {
    Controller.getAcountsUser(req.params.id)
        .then((account) => {
            response.success(req, res, account, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });

}


function getCashCredit(req, res) {
    Controller.getCashCredit(req.body)
    .then((account) => {
        response.success(req, res, account, 201);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    });
}

function getCashDebit(req, res) {
    Controller.getCashDebit(req.body)
        .then((account) => {
            response.success(req, res, account, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function depositDebit(req, res) {
    Controller.depositDebit(req.body)
        .then((account) => {
            response.success(req, res, account, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function payCredit(req, res) {
    Controller.payCredit(req.body)
        .then((account) => {
            response.success(req, res, account, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then((account) => {
            response.success(req, res, account, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });

}

module.exports = router;