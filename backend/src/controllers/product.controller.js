import Product from "../models/product.model";

class ProductController {
    static getProducts(req, res) {
        const query = {};
        if (!!req.query.category) {
            query['categories.name'] = req.query.category;
        }
        if (!!req.query.searchString) {
            query['$text'] = {$search: req.query.searchString};
        }
        Product.find(query)
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
