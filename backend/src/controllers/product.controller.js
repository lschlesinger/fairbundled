import Product from "../models/product.model";

class ProductController {
    static getProducts(req, res) {
        const query = {};
        if (!!req.query.category) {
            query['categories'] = req.query.category;
        }
        if (!!req.query.searchString) {
            query['$text'] = {$search: req.query.searchString};
        }
        Product.find(query)
            .lean() // get json representation of mongoose docs
            .then((products) => {
                products = products.map((product) => {
                    // only return one image too keep response body small
                    const images = product.images && product.images.length > 0 ? [product.images[0]] : [];
                    return {
                        ...product,
                        images: images
                    }
                });
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
