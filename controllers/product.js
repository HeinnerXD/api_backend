'use strict'

const productsModel = require('../database/models/product');

async function addProduct(req, res) {
    try {
        if (req.body.id && req.body.nombre && req.body.farmacia && req.body.cantidad && req.body.precio) {
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
        } else {
            return res.status(400).send({
                ok: false,
                response: 'Body incomplete, check your attributes'
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

async function updateProduct(req, res) {
    try {
        if (req.body.id) {
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
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide an id in the body'
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

async function updateProductByPharmacy(req, res) {
    try {
        if (req.body.id && req.body.farmacia) {
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
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide an id in the body'
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

async function deleteProduct(req, res) {
    try {
        if (req.body.id) {
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
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide an id in the body'
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
        if (req.body.id && req.body.farmacia) {
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
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide id and pharmacy in the body'
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

async function getAllProducts(req, res) {
    try {
        const products = await productsModel.find();
        if (products.length === 0) {
            return res.status(404).send({
                ok: false,
                response: 'Not products found'
            });
        } else {
            return res.status(200).send({
                ok: true,
                products
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

async function getProductsByPharmacy(req, res) {
    try {
        if (req.params.pharmacy) {
            const products = await productsModel.find({ farmacia: req.params.pharmacy });
            if (products.length === 0) {
                return res.status(404).send({
                    ok: false,
                    response: 'Not products found in pharmacy ' + req.params.pharmacy
                });
            } else {
                return res.status(200).send({
                    ok: true,
                    products
                });
            }
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide pharmacy in the url params'
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

async function getProductsById(req, res) {
    try {
        if (req.params.id) {
            const products = await productsModel.find({ id: req.params.id });
            if (products.length === 0) {
                return res.status(404).send({
                    ok: false,
                    response: 'Not products found in with id ' + req.params.id
                });
            } else {
                return res.status(200).send({
                    ok: true,
                    products
                });
            }
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide an id in the url params'
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

async function getProduct(req, res) {
    try {
        if (req.params.id && req.params.pharmacy) {
            const products = await productsModel.find({ id: req.params.id, farmacia: req.params.pharmacy });
            if (products.length === 0) {
                return res.status(404).send({
                    ok: false,
                    response: 'Not products found in pharmacy ' + req.params.pharmacy + ' with id ' + req.params.id
                });
            } else {
                return res.status(200).send({
                    ok: true,
                    products
                });
            }
        } else {
            return res.status(400).send({
                ok: false,
                response: 'You must provide id and pharmacy in the url params'
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

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductByPharmacy,
    deleteProductByPharmacy,
    getProduct,
    getAllProducts,
    getProductsByPharmacy,
    getProductsById
}