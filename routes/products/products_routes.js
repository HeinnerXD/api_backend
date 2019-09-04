'use strict'

const router = require('express').Router();

router.get('/add', (req, res) => {
    return res.status(200).send({
        ok: true,
        response: 'Testing product routes'
    });
})

module.exports = router;