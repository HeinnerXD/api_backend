'use strict'

const productsModel = require('../database/models/product');

async function addProduct(req, res) {
    try {
        var product = {
            id: req.body.id,
            name: req.body.id,
            description: req.body.description,
            pharmacy_id: req.body.pharmacy_id,
            quantity: req.body.quantity
        }
        let exist = productsModel.findOne({id: product.id, pharmacy_id: product.pharmacy_id});
        if (exist) {
            return res.status(400).send({
                ok: false,
                response: 'Product already registered in this pharmacy'
            });
        } else {
            let productToSave = new productsModel(product);
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