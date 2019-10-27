'use strict'

const router = require('express').Router();
const staffController = require('../controllers/staff')

router.get('/', (req, res) => {
    return res.status(200).send({
        ok: true,
        response: 'Here starts de Staff CRUD, go ahead'
    });
});
router.post('/add', staffController.addStaff);

module.exports = router;