'use strict'

const productsModel = require('../database/models/product');

async function addProduct(req, res) {
    try {
        let exist = await productsModel.findOne({ id: req.body.id, farmacia: req.body.farmacia });
        if (exist) {
            return res.status(400).send({
                ok: false,
                response: 'Product already registered in this pharmacy'
            });
        } else {
            let productToSave = new productsModel(req.body);
            productToSave.save((error, response) => {
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
            error: 'Internal Server Error'
        });
    }
}

async function updateProduct(req, res) {
    try {
        const products = await productsModel.find({ id: req.body.id });
        if (!products) {
            return res.status(404).send({
                ok: false,
                response: 'Product not found'
            })
        } else {
            products.forEach(async product => {
                await productsModel.findOneAndUpdate({ id: product.id, farmacia: product.farmacia }, req.body);
            });
            return res.status(200).send({
                ok: true,
                response: 'All products with id ' + req.body.id + ' updated'
            });
        }
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error: 'Internal Server Error'
        });
    }
}

async function updateProductByPharmacy(req, res) {
    try {
        let productUpdated = await productsModel.findOneAndUpdate({ id: req.body.id, farmacia: req.body.farmacia }, req.body);
        if (!productUpdated) {
            return res.status(404).send({
                ok: false,
                response: 'Product not found'
            })
        } else {
            return res.status(200).send({
                ok: true,
                productUpdated
            });
        }
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error: 'Internal Server Error'
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const products = await productsModel.find({ id: req.body.id });
        if (products.length === 0) {
            return res.status(404).send({
                ok: false,
                response: 'Product not found'
            })
        } else {
            products.forEach(async product => {
                await productsModel.findOneAndDelete({ id: product.id, farmacia: product.farmacia }, req.body);
            });
            return res.status(200).send({
                ok: true,
                response: 'All products with id ' + req.body.id + ' deleted'
            });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            error: 'Internal Server Error'
        });
    }
}

async function deleteProductByPharmacy(req, res) {
    try {
        let productDeleted = await productsModel.findOneAndDelete({ id: req.body.id, farmacia: req.body.farmacia });
        if (!productDeleted) {
            return res.status(404).send({
                ok: false,
                response: 'Product not found'
            })
        } else {
            return res.status(200).send({
                ok: true,
                productDeleted
            });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            error: 'Internal Server Error'
        });
    }
}

module.exports = { addProduct, updateProduct, deleteProduct, updateProductByPharmacy, deleteProductByPharmacy }