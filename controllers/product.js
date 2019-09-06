'use strict'

const productsModel = require('../database/models/product');

async function addProduct(req, res) {
    try {
        let exist = await productsModel.findOne({id: req.body.id, pharmacy_id: req.body.pharmacy_id});
        if (exist) {
            return res.status(400).send({
                ok: false,
                response: 'Product already registered in this pharmacy'
            });
        } else {
            let productToSave = new productsModel(req.body);
            productToSave.save((error, response)=>{
                if (error) {
                    return res.status(400).send({
                        ok: false,
                        error
                    });
                } else {
                    if (response) {
                        return res.status(200).send({
                            ok: true,
                            response
                        });
                    } else {
                        return res.status(404).send({
                            ok: false,
                            response: 'Response not found'
                        });
                    }
                }
            });
        }
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
}

module.exports = { addProduct }