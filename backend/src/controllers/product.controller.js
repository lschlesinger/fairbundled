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

    static getProduct(req, res) {
        Product.findById(req.params.id)
            .populate("supplier")
            .populate("certificates")
            .then((product) => {
                res.status(200).json(product);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    static createProduct(req, res) {
        let priceLevel = [];
        if (req.body.priceLevel && req.body.priceLevel.length > 0) {
            priceLevel = req.body.priceLevel.filter((level) => !!level);
        }

        let certificates = [];
        if (req.body.certificates && req.body.certificates.length > 0) {
            certificates = req.body.certificates.map((cert) => !!cert._id ? cert._id : cert);
        }

        let categories = [];
        if (req.body.categories && req.body.categories.length > 0) {
            categories = req.body.categories.map((cat) => !!cat._id ? cat._id : cat);
        }

        const product = {
            name: req.body.name || '',
            description: req.body.description || '',
            ean: req.body.ean || '',
            images: req.body.images || [],
            deliveryDays: req.body.deliveryDays || 1,
            priceLevel: priceLevel,
            certificates: certificates,
            supplier: req.supplierId,
            categories: categories
        };

        Product.create(product)
            .then((product) => {
                res.status(201).json(product);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default ProductController;
