import Product from "../models/product.model";

class ProductController {
    static getProducts(req, res) {
        Product.find({})
            .then((products) => {
                res.status(200).json(products);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    static createProduct(req, res) {
        Product.create(req.body)
            .then((product) => {
                res.status(201).json(product);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default ProductController;
